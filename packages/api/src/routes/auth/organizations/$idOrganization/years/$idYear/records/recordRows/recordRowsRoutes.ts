import { $idRecordRowRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/$idRecordRow/$idRecordRowRoutes.js"
import { createOneRecordRowRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/createOneRecordRow.js"
import { readAllRecordRowsRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/readAllRecordRows.js"


export const recordRowsRoutes = [
    createOneRecordRowRoute,
    readAllRecordRowsRoute,

    ...$idRecordRowRoutes,
]
