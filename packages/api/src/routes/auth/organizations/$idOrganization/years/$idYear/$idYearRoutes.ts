import { filesRoutes } from "../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/files/filesRoutes.js"
import { foldersRoutes } from "../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/folders/foldersRoutes.js"
import { readOneYearRoute } from "../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/readOneYear.js"
import { recordsRoutes } from "../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/records/recordsRoutes.js"
import { reportsRoutes } from "../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/reports/reportsRoutes.js"
import { yearSettingsRoute } from "../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute.js"

export const $idYearRoutes = [
    readOneYearRoute,

    ...recordsRoutes,
    ...filesRoutes,
    ...foldersRoutes,
    ...reportsRoutes,
    ...yearSettingsRoute,
]
