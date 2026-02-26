import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function OrganizationsApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Organisations"
                description="Gestion des organisations, utilisateurs, clés API, abonnements et paiements"
            />

            <DocSection title="Organisations">
                <DocParagraph>
                    Les organisations sont l'entité centrale de l'application. Un utilisateur peut appartenir à
                    plusieurs organisations.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/get-all-my-organization", "Lister les organisations de l'utilisateur"],
                        ["POST /auth/add-new-organization", "Créer une nouvelle organisation"],
                        ["POST /auth/activate-organization-membership", "Activer une invitation"],
                        ["POST /auth/read-one-organization", "Lire les détails d'une organisation"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/add-new-organization">
                <DocParagraph>Créer une nouvelle organisation.</DocParagraph>
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["scope", "string", "oui"],
                        ["name", "string", "oui"],
                        ["siren", "string", "non"],
                        ["email", "string", "non"],
                    ]}
                />
                <DocParagraph>Retourne l'objet organisation créé.</DocParagraph>
            </DocSection>

            <DocSection title="Paramètres d'organisation">
                <DocParagraph>
                    Ces routes nécessitent que l'utilisateur soit administrateur de l'organisation.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/update-one-organization", "Modifier les détails de l'organisation"],
                        ["POST /auth/delete-one-organization", "Supprimer une organisation"],
                    ]}
                />
                <DocTip variant="warning">
                    La suppression d'une organisation est irréversible et supprime toutes les données associées.
                </DocTip>
            </DocSection>

            <DocSection title="Clés API">
                <DocParagraph>Les clés API nécessitent un abonnement premium.</DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-api-keys", "Lister les clés API"],
                        ["POST /auth/create-one-api-key", "Créer une clé API"],
                        ["POST /auth/delete-one-api-key", "Supprimer une clé API"],
                    ]}
                />
                <DocTip variant="info">
                    La clé brute (<code>rawKey</code>) n'est retournée qu'au moment de la création. Conservez-la
                    précieusement.
                </DocTip>
            </DocSection>

            <DocSection title="POST /auth/create-one-api-key">
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["idOrganization", "string", "oui"],
                        ["name", "string", "oui"],
                    ]}
                />
                <DocParagraph>
                    Retourne l'objet clé API avec le champ <code>rawKey</code>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Abonnement et paiements">
                <DocParagraph>Gestion de l'abonnement premium et de l'historique des paiements.</DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-organization-subscription", "Lire le statut de l'abonnement"],
                        ["POST /auth/create-first-payment", "Initier le premier paiement (retourne une URL Mollie)"],
                        ["POST /auth/cancel-subscription", "Annuler l'abonnement"],
                        ["POST /auth/read-all-organization-payments", "Lister les paiements"],
                    ]}
                />
                <DocParagraph>
                    La route <code>/auth/create-first-payment</code> retourne un objet{" "}
                    <code>{"{ checkoutUrl: string }"}</code> vers lequel l'utilisateur doit être redirigé pour procéder
                    au paiement.
                </DocParagraph>
            </DocSection>

            <DocSection title="Utilisateurs d'organisation">
                <DocParagraph>Gestion des membres d'une organisation.</DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-organization-users", "Lister les membres"],
                        ["POST /auth/read-one-organization-user", "Lire un membre"],
                        ["POST /auth/create-one-organization-user", "Inviter un utilisateur"],
                        ["POST /auth/update-one-organization-user", "Modifier un membre"],
                        ["POST /auth/delete-one-organization-user", "Supprimer un membre"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/create-one-organization-user">
                <DocParagraph>Inviter un utilisateur dans l'organisation.</DocParagraph>
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["idOrganization", "string", "oui"],
                        ["isAdmin", "boolean", "oui"],
                        ["user", "{ email: string }", "oui"],
                    ]}
                />
                <DocParagraph>Retourne l'objet membre créé.</DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/api/comptabilité" label="Comptabilité" />
        </DocRoot>
    )
}
