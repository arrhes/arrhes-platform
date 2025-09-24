import { deleteOneRecordRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/deleteOneRecord.js"
import { duplicateOneRecordRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/duplicateOneRecord.js"
import { readOneRecordRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/readOneRecord.js"
import { updateOneRecordRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/updateOneRecord.js"


export const $idRecordRoutes = [
    deleteOneRecordRoute,
    duplicateOneRecordRoute,
    readOneRecordRoute,
    updateOneRecordRoute,
]