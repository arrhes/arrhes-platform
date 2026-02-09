import { Badge } from "@arrhes/ui"
import { css } from "../../../utilities/cn.js"


export function ApiErreurs() {
    return (
        <div className={css({
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
        })}>
            {/* Page header */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
            })}>
                <div className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                })}>
                    <h1 className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}>
                        Gestion des erreurs
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Comprendre les codes d'erreur et gérer les cas d'échec dans vos intégrations.
                </p>
            </div>

            {/* Content */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            })}>
                <Section title="Format des erreurs">
                    <p>
                        Toutes les erreurs de l'API suivent un format standardisé :
                    </p>
                    <CodeBlock>
{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Le champ 'amount' est requis",
    "details": {
      "field": "amount",
      "reason": "required"
    }
  }
}`}
                    </CodeBlock>
                </Section>

                <Section title="Codes HTTP">
                    <p>
                        L'API utilise les codes HTTP standards pour indiquer le statut de la requête :
                    </p>
                    <table className={css({
                        width: "100%",
                        borderCollapse: "collapse",
                        "& th, & td": {
                            padding: "0.75rem",
                            textAlign: "left",
                            borderBottom: "1px solid",
                            borderColor: "neutral/10"
                        },
                        "& th": {
                            fontWeight: "medium",
                            color: "neutral"
                        },
                        "& td": {
                            color: "neutral/70"
                        }
                    })}>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Signification</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>200</code></td>
                                <td>Succès</td>
                            </tr>
                            <tr>
                                <td><code>201</code></td>
                                <td>Ressource créée</td>
                            </tr>
                            <tr>
                                <td><code>400</code></td>
                                <td>Requête invalide</td>
                            </tr>
                            <tr>
                                <td><code>401</code></td>
                                <td>Non authentifié</td>
                            </tr>
                            <tr>
                                <td><code>403</code></td>
                                <td>Accès interdit</td>
                            </tr>
                            <tr>
                                <td><code>404</code></td>
                                <td>Ressource non trouvée</td>
                            </tr>
                            <tr>
                                <td><code>422</code></td>
                                <td>Erreur de validation</td>
                            </tr>
                            <tr>
                                <td><code>429</code></td>
                                <td>Trop de requêtes</td>
                            </tr>
                            <tr>
                                <td><code>500</code></td>
                                <td>Erreur serveur</td>
                            </tr>
                        </tbody>
                    </table>
                </Section>

                <Section title="Codes d'erreur">
                    <p>
                        En plus du code HTTP, chaque erreur contient un code spécifique :
                    </p>
                    <ul>
                        <li><code>VALIDATION_ERROR</code> - Données invalides</li>
                        <li><code>AUTHENTICATION_ERROR</code> - Token invalide ou expiré</li>
                        <li><code>AUTHORIZATION_ERROR</code> - Permissions insuffisantes</li>
                        <li><code>NOT_FOUND</code> - Ressource inexistante</li>
                        <li><code>CONFLICT</code> - Conflit (ex: doublon)</li>
                        <li><code>RATE_LIMITED</code> - Limite de requêtes atteinte</li>
                        <li><code>INTERNAL_ERROR</code> - Erreur interne</li>
                    </ul>
                </Section>

                <Section title="Limites de requêtes (Rate Limiting)">
                    <p>
                        L'API impose des limites de requêtes pour garantir la stabilité du service :
                    </p>
                    <ul>
                        <li>100 requêtes par minute en lecture</li>
                        <li>30 requêtes par minute en écriture</li>
                    </ul>
                    <p>
                        Les en-têtes suivants indiquent votre utilisation :
                    </p>
                    <ul>
                        <li><code>X-RateLimit-Limit</code> - Limite totale</li>
                        <li><code>X-RateLimit-Remaining</code> - Requêtes restantes</li>
                        <li><code>X-RateLimit-Reset</code> - Timestamp de réinitialisation</li>
                    </ul>
                </Section>

                <Section title="Gestion des erreurs côté client">
                    <p>
                        Exemple de gestion des erreurs en JavaScript :
                    </p>
                    <CodeBlock>
{`async function fetchOrganisations() {
  try {
    const response = await fetch('/v1/organisations', {
      headers: {
        'Authorization': \`Bearer \${API_TOKEN}\`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      
      switch (error.error.code) {
        case 'AUTHENTICATION_ERROR':
          // Rediriger vers la connexion
          break;
        case 'RATE_LIMITED':
          // Attendre et réessayer
          break;
        default:
          // Afficher l'erreur
          console.error(error.error.message);
      }
      return;
    }

    return await response.json();
  } catch (e) {
    // Erreur réseau
    console.error('Erreur de connexion');
  }
}`}
                    </CodeBlock>
                </Section>
            </div>
        </div>
    )
}


function Section(props: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
        })}>
            <h2 className={css({
                fontSize: "md",
                fontWeight: "semibold",
                color: "neutral",
            })}>
                {props.title}
            </h2>
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                fontSize: "sm",
                color: "neutral/70",
                lineHeight: "relaxed",
                "& p": {
                    margin: 0
                },
                "& ul, & ol": {
                    margin: 0,
                    paddingLeft: "1.5rem"
                },
                "& li": {
                    marginBottom: "0.25rem"
                },
                "& code": {
                    backgroundColor: "neutral/5",
                    padding: "0.125rem 0.375rem",
                    borderRadius: "sm",
                    fontFamily: "mono",
                    fontSize: "xs"
                }
            })}>
                {props.children}
            </div>
        </section>
    )
}


function CodeBlock(props: { children: React.ReactNode }) {
    return (
        <pre className={css({
            padding: "1rem",
            borderRadius: "md",
            backgroundColor: "neutral/5",
            fontFamily: "mono",
            fontSize: "sm",
            color: "neutral",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all"
        })}>
            <code>{props.children}</code>
        </pre>
    )
}
