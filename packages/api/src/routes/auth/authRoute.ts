import { authFactory } from "#src/factories/authFactory.js"
import { authMiddleware } from "#src/middlewares/authMiddleware.js"
import { organizationsRoutes } from "#src/routes/auth/organizations/organizationsRoutes.js"
import { settingsRoutes } from "#src/routes/auth/settings/settingsRoutes.js"
import { supportRoutes } from "#src/routes/auth/support/supportRoutes.js"
import { routePath } from "@arrhes/schemas/components"


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