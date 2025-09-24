import { authFactory } from "#/factories/authFactory.js"
import { Exception } from "#/utilities/exception.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { validateUserEmailRouteDefinition } from "@arrhes/metadata/routes"
import { eq } from "drizzle-orm"


export const validateUserEmailRoute = authFactory.createApp()
    .post(
        validateUserEmailRouteDefinition.path,
        bodyValidator(validateUserEmailRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            if (body.emailToken !== c.var.user.emailToken) {
                throw new Exception({
                    internalMessage: "Wrong token",
                    statusCode: 403,
                    externalMessage: "Code incorrect",
                })
            }

            const newEmail = c.var.user.emailToValidate
            if (newEmail === null) {
                throw new Exception({
                    internalMessage: "No email to validate",
                    statusCode: 403,
                    externalMessage: "Aucun email à valider",
                })
            }

            const updatedUser = await updateOne({
                database: c.var.clients.sql,
                table: models.user,
                data: {
                    email: newEmail,
                    emailToValidate: null,
                    emailToken: null,
                    emailTokenExpiresAt: null,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => (
                    eq(table.emailToken, body.emailToken)
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: validateUserEmailRouteDefinition.schemas.return,
                data: updatedUser,
            })
        }
    )