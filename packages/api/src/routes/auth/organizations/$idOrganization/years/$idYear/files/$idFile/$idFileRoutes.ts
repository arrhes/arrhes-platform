import { deleteOneFileRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/$idFile/deleteOneFile.js"
import { generateFileGetSignedUrlRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/$idFile/generateFileGetSignedUrl.js"
import { generateFilePutSignedUrlRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/$idFile/generateFilePutSignedUrl.js"
import { readOneFileRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/$idFile/readOneFile.js"
import { updateOneFileRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/$idFile/updateOneFile.js"

export const $idFileRoutes = [
    deleteOneFileRoute,
    generateFileGetSignedUrlRoute,
    generateFilePutSignedUrlRoute,
    readOneFileRoute,
    updateOneFileRoute,
]
