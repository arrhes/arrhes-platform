import { organizationSettingsRoutes } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoutes.js"
import { readOneOrganizationRoute } from "#src/routes/auth/organizations/$idOrganization/readOneOrganization.js"
import { yearsRoutes } from "#src/routes/auth/organizations/$idOrganization/years/yearsRoutes.js"


export const $idOrganizationRoutes = [
    readOneOrganizationRoute,

    ...organizationSettingsRoutes,
    ...yearsRoutes,
]
