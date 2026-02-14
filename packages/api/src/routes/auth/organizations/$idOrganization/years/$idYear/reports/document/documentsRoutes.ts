import { $idDocumentRoutes } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/reports/document/$idDocument/$idDocumentRoutes.js"
import { readAllDocumentsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/reports/document/readAllDocuments.js"


export const documentsRoutes = [
    readAllDocumentsRoute,

    ...$idDocumentRoutes,
]