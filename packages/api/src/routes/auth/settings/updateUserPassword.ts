import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { updateUserPasswordRouteDefinition } from "@arrhes/schemas/routes"
import { pbkdf2Sync } from "crypto"
import { eq } from "drizzle-orm"


export const updateUserPasswordRoute = authFactory.createApp()
    .post(
        updateUserPasswordRouteDefinition.path,
        bodyValidator(updateUserPasswordRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            if (body.newPassword === body.newPasswordCheck) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Wrong new password check",
                    externalMessage: "Les mots de passe ne correspondent pas",
                })
            }

            const givenPasswordHash = pbkdf2Sync(body.currentPassword, c.var.user.passwordSalt, 128000, 64, `sha512`).toString(`hex`)
            if (givenPasswordHash !== c.var.user.passwordHash) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Invalid password",
                    externalMessage: "Mot de passe incorrect",
                })
            }

            const newPasswordHash = pbkdf2Sync(body.newPassword, c.var.user.passwordSalt, 128000, 64, `sha512`).toString(`hex`)

            const updatePassword = await updateOne({
                database: c.var.clients.sql,
                table: models.user,
                data: {
                    passwordHash: newPasswordHash,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => (
                    eq(table.id, c.var.user.id)
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateUserPasswordRouteDefinition.schemas.return,
                data: updatePassword,
            })
        }
    )