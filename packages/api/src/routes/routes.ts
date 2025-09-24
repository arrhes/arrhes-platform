import { apiFactory } from "#src/factories/apiFactory.js"
import { authRoute } from "#src/routes/auth/authRoute.js"
import { publicRoute } from "#src/routes/public/publicRoute.js"


export const routes = apiFactory.createApp()
    .route("/", authRoute)
    .route("/", publicRoute)
