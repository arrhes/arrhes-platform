import { authFactory } from "#/factories/authFactory.js"
import { authMiddleware } from "#/middlewares/authMiddleware.js"
import { organizationsRoutes } from "#/routes/auth/organizations/organizationsRoutes.js"
import { settingsRoutes } from "#/routes/auth/settings/settingsRoutes.js"
import { supportRoutes } from "#/routes/auth/support/supportRoutes.js"
import { routePath } from "@arrhes/metadata/components"


export const authRoute = authFactory.createApp()
    .use(`${routePath.auth}/*`, authMiddleware)


export const authRoutes = [
    ...organizationsRoutes,
    ...settingsRoutes,
    ...supportRoutes,
]

for (const route of authRoutes) {
    authRoute.route("/", route)
}