import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function FilesApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Fichiers et documents"
                description="Gestion des fichiers, dossiers, URLs signées et génération de rapports PDF"
            />

            <DocTip variant="info">
                Toutes les routes de cette section nécessitent <code>idOrganization</code> et <code>idYear</code> dans
                le corps de la requête.
            </DocTip>

            <DocSection title="Fichiers">
                <DocParagraph>
                    Les fichiers sont les pièces justificatives rattachées à un exercice comptable. Le stockage utilise
                    des URLs signées compatibles S3.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-files", "Lister les fichiers"],
                        ["POST /auth/read-one-file", "Lire un fichier"],
                        ["POST /auth/create-one-file", "Créer un fichier"],
                        ["POST /auth/update-one-file", "Modifier un fichier"],
                        ["POST /auth/delete-one-file", "Supprimer un fichier"],
                        ["POST /auth/generate-file-put-signed-url", "Générer une URL d'upload"],
                        ["POST /auth/generate-file-get-signed-url", "Générer une URL de téléchargement"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/generate-file-put-signed-url">
                <DocParagraph>Générer une URL signée pour uploader un fichier. Taille maximale : 10 Mo.</DocParagraph>
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["idFile", "string", "oui"],
                        ["type", "string", "oui"],
                        ["size", "number", "oui"],
                    ]}
                />
                <DocParagraph>
                    Retourne <code>{"{ file, url: string }"}</code>. Erreur <code>400</code> si le fichier est trop
                    volumineux ou si la limite de stockage est atteinte.
                </DocParagraph>
                <DocTip variant="warning">
                    La taille maximale par fichier est de 10 Mo. Au-delà, l'API retourne une erreur <code>400</code>.
                </DocTip>
            </DocSection>

            <DocSection title="POST /auth/generate-file-get-signed-url">
                <DocParagraph>Générer une URL signée pour télécharger un fichier.</DocParagraph>
                <DocTable headers={["Champ", "Type", "Requis"]} rows={[["idFile", "string", "oui"]]} />
                <DocParagraph>
                    Retourne <code>{"{ url: string }"}</code>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Dossiers">
                <DocParagraph>Les dossiers permettent d'organiser les fichiers au sein d'un exercice.</DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-folders", "Lister les dossiers"],
                        ["POST /auth/read-one-folder", "Lire un dossier"],
                        ["POST /auth/create-one-folder", "Créer un dossier"],
                        ["POST /auth/update-one-folder", "Modifier un dossier"],
                        ["POST /auth/delete-one-folder", "Supprimer un dossier"],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/create-one-folder">
                <DocTable
                    headers={["Champ", "Type", "Requis"]}
                    rows={[
                        ["name", "string", "oui"],
                        ["idFolderParent", "string", "non"],
                    ]}
                />
                <DocParagraph>Retourne l'objet dossier créé.</DocParagraph>
            </DocSection>

            <DocSection title="Documents et rapports">
                <DocParagraph>
                    Les documents sont des rapports PDF générés à partir des données comptables : bilans et comptes de
                    résultat.
                </DocParagraph>
                <DocTable
                    headers={["Route", "Description"]}
                    rows={[
                        ["POST /auth/read-all-documents", "Lister les documents générés"],
                        ["POST /auth/read-one-document", "Lire un document"],
                        ["POST /auth/generate-balance-sheet-report-document", "Générer un rapport de bilan en PDF"],
                        [
                            "POST /auth/generate-income-statement-report-document",
                            "Générer un rapport de compte de résultat en PDF",
                        ],
                        [
                            "POST /auth/generate-document-get-signed-url",
                            "Générer une URL de téléchargement pour un document",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="POST /auth/generate-document-get-signed-url">
                <DocTable headers={["Champ", "Type", "Requis"]} rows={[["idDocument", "string", "oui"]]} />
                <DocParagraph>
                    Retourne <code>{"{ url: string }"}</code>.
                </DocParagraph>
            </DocSection>
        </DocRoot>
    )
}
