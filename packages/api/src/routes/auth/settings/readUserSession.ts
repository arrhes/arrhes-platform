import { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { authFactory } from "../../../factories/authFactory.js"
import { response } from "../../../utilities/response.js"
import { bodyValidator } from "../../../validators/bodyValidator.js"

export const readUserSessionRoute = authFactory
    .createApp()
    .post(
        readUserSessionRouteDefinition.path,
        bodyValidator(readUserSessionRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            return response({
                context: c,
                statusCode: 200,
                schema: readUserSessionRouteDefinition.schemas.return,
                data: {
                    ...c.var.userSession,
                    user: c.var.user,
                },
            })
        },
    )
