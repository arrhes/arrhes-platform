import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocList } from "../../../components/document/docList.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function IntroductionApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Introduction"
                description="Conventions, authentification et gestion des erreurs de l'API REST"
            />

            <DocSection title="Conventions">
                <DocParagraph>L'API d'Arrhes suit un ensemble de conventions simples et uniformes :</DocParagraph>
                <DocList
                    items={[
                        "Toutes les routes utilisent la méthode POST",
                        "Le corps de la requête et la réponse sont en JSON",
                        "Les schémas de validation utilisent Valibot",
                        "Les identifiants sont des chaînes NanoID",
                        "Les dates suivent le format ISO 8601",
                        'Les montants (débit, crédit) sont des chaînes numériques (ex : "100.00")',
                    ]}
                />
                <DocTip variant="info">
                    Les identifiants d'entités et le cadrage organisationnel sont passés dans le corps de la requête, et
                    non dans l'URL.
                </DocTip>
            </DocSection>

            <DocSection title="Authentification">
                <DocParagraph>
                    L'API utilise une authentification par cookies de session. Lors de la connexion via{" "}
                    <code>/public/sign-in</code>, deux cookies sont définis :
                </DocParagraph>
                <DocList
                    items={[
                        "arrhes_id_user_session : identifiant de session (httpOnly)",
                        "arrhes_is_auth : indicateur d'authentification (accessible côté client)",
                    ]}
                />
                <DocParagraph>
                    Les routes publiques (<code>/public/*</code>) ne nécessitent pas d'authentification. Toutes les
                    routes protégées (<code>/auth/*</code>) requièrent un cookie de session valide.
                </DocParagraph>
                <DocTip variant="warning">
                    Certaines routes nécessitent des permissions supplémentaires : être administrateur de l'organisation
                    ou disposer d'un abonnement premium.
                </DocTip>
            </DocSection>

            <DocSection title="Gestion des erreurs">
                <DocParagraph>Toutes les erreurs sont retournées avec un message en français :</DocParagraph>
                <DocTable
                    headers={["Code", "Signification"]}
                    rows={[
                        ["400", "Requête invalide - erreur de validation, règle métier non respectée"],
                        ["401", "Non autorisé - session manquante/invalide, permissions insuffisantes"],
                        ["404", "Non trouvé - la route n'existe pas"],
                        ["500", "Erreur interne du serveur"],
                    ]}
                />
                <DocParagraph>Les messages d'erreur courants incluent :</DocParagraph>
                <DocTable
                    headers={["Message", "Signification"]}
                    rows={[
                        ['"Identifiants incorrects"', "Email ou mot de passe incorrect"],
                        ['"Les mots de passe ne correspondent pas"', "Les nouveaux mots de passe ne correspondent pas"],
                        ['"Mot de passe incorrect"', "Mot de passe actuel incorrect"],
                        ["\"Vous n'êtes pas administrateur de l'organisation\"", "Accès administrateur requis"],
                        ['"Données invalides"', "La validation du corps de la requête a échoué"],
                        ['"Fichier trop volumineux"', "Le fichier dépasse la limite de 10 Mo"],
                        ['"Limite de stockage atteinte"', "Limite de stockage de l'organisation atteinte"],
                    ]}
                />
            </DocSection>

            <DocSection title="Catégories de routes">
                <DocParagraph>
                    L'API expose 112 routes réparties en 23 catégories. Le tableau ci-dessous résume chaque catégorie :
                </DocParagraph>
                <DocTable
                    headers={["#", "Catégorie", "Préfixe", "Routes", "Auth"]}
                    rows={[
                        ["1", "Authentification", "/public", "4", "Non"],
                        ["2", "Webhooks", "/public", "1", "Non"],
                        ["3", "Paramètres utilisateur", "/auth", "6", "Oui"],
                        ["4", "Support", "/auth", "1", "Oui"],
                        ["5", "Organisations", "/auth", "4", "Oui"],
                        ["6", "Paramètres d'organisation", "/auth", "2", "Oui (admin)"],
                        ["7", "Clés API", "/auth", "3", "Oui (premium)"],
                        ["8", "Abonnement et paiements", "/auth", "4", "Oui (admin)"],
                        ["9", "Utilisateurs d'organisation", "/auth", "5", "Oui"],
                        ["10", "Exercices", "/auth", "3", "Oui"],
                        ["11", "Paramètres d'exercice", "/auth", "6", "Oui"],
                        ["12", "Comptes", "/auth", "6", "Oui"],
                        ["13", "Journaux", "/auth", "6", "Oui"],
                        ["14", "Bilans", "/auth", "7", "Oui"],
                        ["15", "Comptes de résultat", "/auth", "7", "Oui"],
                        ["16", "Libellés d'écriture", "/auth", "5", "Oui"],
                        ["17", "Calculs", "/auth", "6", "Oui"],
                        ["18", "Calculs - comptes de résultat", "/auth", "5", "Oui"],
                        ["19", "Écritures", "/auth", "8", "Oui"],
                        ["20", "Lignes d'écriture", "/auth", "6", "Oui"],
                        ["21", "Fichiers", "/auth", "7", "Oui"],
                        ["22", "Dossiers", "/auth", "5", "Oui"],
                        ["23", "Documents et rapports", "/auth", "5", "Oui"],
                    ]}
                />
            </DocSection>

            <DocNextPage to="/documentation/api/authentification" label="Authentification et utilisateurs" />
        </DocRoot>
    )
}
