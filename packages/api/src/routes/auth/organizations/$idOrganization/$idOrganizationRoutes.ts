import { organizationSettingsRoutes } from "../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoutes.js"
import { readOneOrganizationRoute } from "../../../../routes/auth/organizations/$idOrganization/readOneOrganization.js"
import { yearsRoutes } from "../../../../routes/auth/organizations/$idOrganization/years/yearsRoutes.js"

export const $idOrganizationRoutes = [
    readOneOrganizationRoute,

    ...organizationSettingsRoutes,
    ...yearsRoutes,
]
