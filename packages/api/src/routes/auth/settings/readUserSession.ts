import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { readUserSessionRouteDefinition } from "@arrhes/schemas/routes"


export const readUserSessionRoute = authFactory.createApp()
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
                    user: c.var.user
                },
            })
        }
    )