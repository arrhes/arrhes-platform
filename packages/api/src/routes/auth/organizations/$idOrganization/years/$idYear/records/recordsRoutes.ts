import { $idRecordRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRoutes.js"
import { createOneRecordRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/createOneRecord.js"
import { readAllRecordsRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/readAllRecords.js"
import { recordRowsRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/recordRows/recordRowsRoutes.js"


export const recordsRoutes = [
    createOneRecordRoute,
    readAllRecordsRoute,

    ...$idRecordRoutes,
    ...recordRowsRoutes,
]