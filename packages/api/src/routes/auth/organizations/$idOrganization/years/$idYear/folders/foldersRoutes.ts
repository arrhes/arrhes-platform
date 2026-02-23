import { $idFolderRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/folders/$idFolder/$idFolderRoutes.js"
import { createOneFolderRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/folders/createOneFolder.js"
import { readAllFoldersRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/folders/readAllFolders.js"

export const foldersRoutes = [
    createOneFolderRoute,
    readAllFoldersRoute,

    ...$idFolderRoutes,
]
