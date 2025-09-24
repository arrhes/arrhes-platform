import { $idRecordRowRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/$idRecordRow/$idRecordRowRoutes.js"
import { createOneRecordRowRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/createOneRecordRow.js"
import { readAllRecordRowsRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/readAllRecordRows.js"


export const recordRowsRoutes = [
    createOneRecordRowRoute,
    readAllRecordRowsRoute,

    ...$idRecordRowRoutes,
]
