import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { activateUserRouteDefinition } from "@arrhes/schemas/routes"
import { eq } from "drizzle-orm"

export const activateUserRoute = authFactory.createApp()
    .post(
        activateUserRouteDefinition.path,
        bodyValidator(activateUserRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            if (body.emailToken !== c.var.user.emailToken) {
                throw new Exception({
                    internalMessage: "Wrong token",
                    statusCode: 403,
                    externalMessage: "Code incorrect",
                })
            }

            const updatedUser = await updateOne({
                database: c.var.clients.sql,
                table: models.user,
                data: {
                    isActive: true,
                    emailToValidate: null,
                    emailToken: null,
                    emailTokenExpiresAt: null,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => (
                    eq(table.id, c.var.user.id)
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: activateUserRouteDefinition.schemas.return,
                data: updatedUser,
            })
        }
    )