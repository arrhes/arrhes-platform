import { DocHeader } from "../../../components/document/docHeader.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocRoot } from "../../../components/document/docRoot.js"


export function AttachmentsDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Voter espace de stockage"
                description="Gérer vos documents et fichiers"
            />

            <DocNextPage
                to="/documentation/dashboard/documents"
                label="Documents de synthèse"
            />
        </DocRoot>
    )
}
