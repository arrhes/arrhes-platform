import { deleteOneRecordRowRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/$idRecordRow/deleteOneRecordRow.js"
import { readOneRecordRowRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/$idRecordRow/readOneRecordRow.js"
import { updateOneRecordRowRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/$idRecordRow/updateOneRecordRow.js"


export const $idRecordRowRoutes = [
    deleteOneRecordRowRoute,
    readOneRecordRowRoute,
    updateOneRecordRowRoute,
]