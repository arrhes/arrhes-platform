import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function AuthenticationApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Authentification et utilisateurs"
                description="Routes publiques d'authentification, paramètres utilisateur et support"
            />

            <DocSection title="Authentification">
                <DocParagraph>
                    Les routes d'authentification sont accessibles sans session. Elles permettent de créer un compte, se
                    connecter et se déconnecter.
                </DocParagraph>

                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /public/sign-up", "Créer un nouveau compte utilisateur"],
                        ["POST /public/sign-in", "Se connecter avec email et mot de passe"],
                        ["POST /public/sign-out", "Se déconnecter et invalider la session"],
                        ["POST /public/send-magic-link", "Envoyer un lien de connexion par email"],
                    ]}
                />

                <DocTip variant="info">
                    La route <code>/public/sign-in</code> définit les cookies <code>arrhes_id_user_session</code> et{" "}
                    <code>arrhes_is_auth</code> nécessaires pour les routes protégées.
                </DocTip>
            </DocSection>

            <DocSection title="POST /public/sign-up">
                <DocParagraph>Créer un nouveau compte utilisateur.</DocParagraph>
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["email", "string", "oui"],
                        ["password", "string", "oui"],
                        ["passwordCheck", "string", "oui"],
                    ]}
                />
                <DocParagraph>
                    Retourne <code>{"{}"}</code>. Erreur <code>400</code> si les mots de passe ne correspondent pas.
                </DocParagraph>
            </DocSection>

            <DocSection title="POST /public/sign-in">
                <DocParagraph>Se connecter avec email et mot de passe.</DocParagraph>
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["email", "string", "oui"],
                        ["password", "string", "oui"],
                    ]}
                />
                <DocParagraph>
                    Retourne <code>{"{}"}</code>. Erreur <code>400</code> si les identifiants sont incorrects.
                </DocParagraph>
            </DocSection>

            <DocSection title="POST /public/sign-out">
                <DocParagraph>Se déconnecter et invalider la session courante.</DocParagraph>
                <DocParagraph>
                    Aucun champ requis. Retourne <code>{"{}"}</code>.
                </DocParagraph>
            </DocSection>

            <DocSection title="POST /public/send-magic-link">
                <DocParagraph>Envoyer un lien de connexion par email.</DocParagraph>
                <DocTable headers={["Champ", "Type", "Requis"]} rows={[["email", "string", "oui"]]} />
                <DocParagraph>
                    Retourne <code>{"{}"}</code>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Webhooks">
                <DocParagraph>Route de callback pour les notifications de paiement Mollie.</DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[["POST /public/mollie-webhook", "Recevoir les mises à jour de statut de paiement"]]}
                />
                <DocTip variant="warning">
                    Cette route est destinée à être appelée par Mollie uniquement. Elle ne doit pas être utilisée
                    directement.
                </DocTip>
            </DocSection>

            <DocSection title="Paramètres utilisateur">
                <DocParagraph>
                    Ces routes permettent de gérer le profil et les identifiants de l'utilisateur connecté. Toutes
                    nécessitent une session active.
                </DocParagraph>

                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-user-session", "Lire la session et les données utilisateur"],
                        ["POST /auth/update-user", "Mettre à jour le profil (alias)"],
                        ["POST /auth/update-user-email", "Changer l'adresse email"],
                        ["POST /auth/update-user-password", "Changer le mot de passe"],
                        ["POST /auth/activate-user", "Activer le compte via un token email"],
                        ["POST /auth/validate-user-email", "Valider une nouvelle adresse email"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/update-user-email">
                <DocParagraph>Changer l'adresse email de l'utilisateur. Requiert le mot de passe actuel.</DocParagraph>
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["currentPassword", "string", "oui"],
                        ["emailToValidate", "string", "oui"],
                    ]}
                />
                <DocParagraph>Retourne l'objet utilisateur mis à jour.</DocParagraph>
            </DocSection>

            <DocSection title="POST /auth/update-user-password">
                <DocParagraph>Changer le mot de passe de l'utilisateur.</DocParagraph>
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["currentPassword", "string", "oui"],
                        ["newPassword", "string", "oui"],
                        ["newPasswordCheck", "string", "oui"],
                    ]}
                />
                <DocParagraph>
                    Retourne l'objet utilisateur. Erreur <code>400</code> si les mots de passe ne correspondent pas ou
                    si le mot de passe actuel est incorrect.
                </DocParagraph>
            </DocSection>

            <DocSection title="Support">
                <DocParagraph>Envoyer un ticket de support depuis l'application.</DocParagraph>
                <DocTable
                    headers={["Route", "Champs", "Description"]}
                    rows={[
                        [
                            "POST /auth/send-support-message",
                            "category (string | null), message (string)",
                            "Envoyer un message de support",
                        ],
                    ]}
                />
                <DocParagraph>
                    Retourne <code>{"{}"}</code>.
                </DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/api/organisations" label="Organisations" />
        </DocRoot>
    )
}
