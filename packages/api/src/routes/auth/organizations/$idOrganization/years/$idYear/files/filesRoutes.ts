import { $idFileRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/$idFile/$idFileRoutes.js"
import { createOneFileRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/createOneFile.js"
import { readAllFilesRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/readAllFiles.js"

export const filesRoutes = [
    createOneFileRoute,
    readAllFilesRoute,

    ...$idFileRoutes,
]
