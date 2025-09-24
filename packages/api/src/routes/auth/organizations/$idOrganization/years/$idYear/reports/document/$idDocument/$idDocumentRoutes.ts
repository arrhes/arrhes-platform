import { generateDocumentGetSignedUrlRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/reports/document/$idDocument/generateDocumentGetSignedUrl.js"
import { readOneDocumentRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/reports/document/$idDocument/readOneDocument.js"


export const $idDocumentRoutes = [
    generateDocumentGetSignedUrlRoute,
    readOneDocumentRoute,
]