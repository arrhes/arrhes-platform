import { attachmentsRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsRoutes.js"
import { readOneYearRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/readOneYear.js"
import { recordsRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/records/recordsRoutes.js"
import { reportsRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/reports/reportsRoutes.js"
import { yearSettingsRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute.js"


export const $idYearRoutes = [
    readOneYearRoute,

    ...recordsRoutes,
    ...attachmentsRoutes,
    ...reportsRoutes,
    ...yearSettingsRoute,
]
