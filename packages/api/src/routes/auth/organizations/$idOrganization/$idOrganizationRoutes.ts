import { authFactory } from "../../../../factories/authFactory.js"
import { subscriptionMiddleware } from "../../../../middlewares/subscriptionMiddleware.js"
import { organizationSettingsRoutes } from "../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoutes.js"
import { readOneOrganizationRoute } from "../../../../routes/auth/organizations/$idOrganization/readOneOrganization.js"
import { yearsRoutes } from "../../../../routes/auth/organizations/$idOrganization/years/yearsRoutes.js"

const premiumRoute = authFactory.createApp().use("*", subscriptionMiddleware)

for (const route of yearsRoutes) {
    premiumRoute.route("/", route)
}

export const $idOrganizationRoutes = [
    readOneOrganizationRoute,

    ...organizationSettingsRoutes,
    premiumRoute,
]
