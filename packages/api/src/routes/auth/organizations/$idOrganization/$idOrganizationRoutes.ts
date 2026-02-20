import { organizationSettingsRoutes } from "../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoutes.js"
import { readOneOrganizationRoute } from "../../../../routes/auth/organizations/$idOrganization/readOneOrganization.js"
import { yearsRoutes } from "../../../../routes/auth/organizations/$idOrganization/years/yearsRoutes.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"

const premiumRoute = apiFactory.createApp()

for (const route of yearsRoutes) {
    premiumRoute.route("/", route)
}

export const $idOrganizationRoutes = [
    readOneOrganizationRoute,

    ...organizationSettingsRoutes,
    premiumRoute,
]
