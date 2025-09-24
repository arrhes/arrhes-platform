import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { updateUserRouteDefinition } from "@arrhes/metadata/routes"
import { eq } from "drizzle-orm"


export const updateUserRoute = authFactory.createApp()
    .post(
        updateUserRouteDefinition.path,
        bodyValidator(updateUserRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updateUser = await updateOne({
                database: c.var.clients.sql,
                table: models.user,
                data: {
                    alias: body.alias,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => (
                    eq(table.id, c.var.user.id)
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateUserRouteDefinition.schemas.return,
                data: updateUser,
            })
        }
    )