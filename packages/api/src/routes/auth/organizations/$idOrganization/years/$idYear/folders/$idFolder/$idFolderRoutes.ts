import { deleteOneFolderRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/folders/$idFolder/deleteOneFolder.js"
import { readOneFolderRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/folders/$idFolder/readOneFolder.js"
import { updateOneFolderRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/folders/$idFolder/updateOneFolder.js"

export const $idFolderRoutes = [deleteOneFolderRoute, readOneFolderRoute, updateOneFolderRoute]
