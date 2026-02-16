import { apiFactory } from "../factories/apiFactory.js"
import { authRoute } from "../routes/auth/authRoute.js"
import { publicRoute } from "../routes/public/publicRoute.js"

export const routes = apiFactory.createApp().route("/", authRoute).route("/", publicRoute)
