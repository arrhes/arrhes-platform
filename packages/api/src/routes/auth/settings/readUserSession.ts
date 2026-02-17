import { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { authFactory } from "../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { response } from "../../../utilities/response.js"

export const readUserSessionRoute = authFactory.createApp().post(readUserSessionRouteDefinition.path, async (c) => {
    const _body = await validateBodyMiddleware({
        context: c,
        schema: readUserSessionRouteDefinition.schemas.body,
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readUserSessionRouteDefinition.schemas.return,
        data: {
            ...c.var.userSession,
            user: c.var.user,
        },
    })
})
