import { Badge } from "@arrhes/ui"
import { css } from "../../../utilities/cn.js"


export function ApiAuthentification() {
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
                        Authentification
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Apprenez à générer et utiliser des tokens API pour authentifier vos requêtes.
                </p>
            </div>

            {/* Content */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            })}>
                <Section title="Génération d'un token API">
                    <p>
                        Pour utiliser l'API Arrhes, vous devez d'abord générer un token d'accès depuis
                        votre tableau de bord :
                    </p>
                    <ol>
                        <li>Connectez-vous à votre compte Arrhes</li>
                        <li>Accédez aux Paramètres {">"} API</li>
                        <li>Cliquez sur "Générer un nouveau token"</li>
                        <li>Copiez et conservez votre token en lieu sûr</li>
                    </ol>
                    <div className={css({
                        padding: "1rem",
                        borderRadius: "md",
                        backgroundColor: "warning/8",
                        border: "1px solid",
                        borderColor: "warning/20",
                        fontSize: "sm",
                        color: "neutral/80",
                    })}>
                        <strong>Important :</strong> Le token n'est affiché qu'une seule fois lors de sa
                        création. Si vous le perdez, vous devrez en générer un nouveau.
                    </div>
                </Section>

                <Section title="Utilisation du token">
                    <p>
                        Incluez votre token dans l'en-tête <code>Authorization</code> de chaque requête :
                    </p>
                    <CodeBlock>
{`curl -X GET https://api.arrhes.fr/v1/organisations \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json"`}
                    </CodeBlock>
                </Section>

                <Section title="Permissions">
                    <p>
                        Chaque token est associé à des permissions qui déterminent les actions autorisées :
                    </p>
                    <ul>
                        <li><code>read:organisations</code> - Lecture des organisations</li>
                        <li><code>write:organisations</code> - Création et modification des organisations</li>
                        <li><code>read:records</code> - Lecture des écritures comptables</li>
                        <li><code>write:records</code> - Création et modification des écritures</li>
                        <li><code>read:reports</code> - Génération des rapports</li>
                    </ul>
                </Section>

                <Section title="Révocation d'un token">
                    <p>
                        Si votre token est compromis ou n'est plus utilisé, vous pouvez le révoquer :
                    </p>
                    <ol>
                        <li>Accédez aux Paramètres {">"} API</li>
                        <li>Trouvez le token concerné dans la liste</li>
                        <li>Cliquez sur "Révoquer"</li>
                    </ol>
                    <p>
                        Le token sera immédiatement invalidé et toutes les requêtes l'utilisant
                        recevront une erreur 401.
                    </p>
                </Section>

                <Section title="Bonnes pratiques">
                    <ul>
                        <li>Ne partagez jamais votre token API</li>
                        <li>Stockez vos tokens dans des variables d'environnement</li>
                        <li>Utilisez des tokens différents pour chaque application</li>
                        <li>Révoquez les tokens inutilisés</li>
                        <li>Limitez les permissions au strict nécessaire</li>
                    </ul>
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
