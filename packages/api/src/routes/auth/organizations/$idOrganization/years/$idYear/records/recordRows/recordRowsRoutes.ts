import { $idRecordRowRoutes } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/$idRecordRow/$idRecordRowRoutes.js"
import { createOneRecordRowRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/createOneRecordRow.js"
import { readAllRecordRowsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/readAllRecordRows.js"
import { updateManyRecordRowsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/updateManyRecordRows.js"


export const recordRowsRoutes = [
    createOneRecordRowRoute,
    readAllRecordRowsRoute,
    updateManyRecordRowsRoute,

    ...$idRecordRowRoutes,
]
