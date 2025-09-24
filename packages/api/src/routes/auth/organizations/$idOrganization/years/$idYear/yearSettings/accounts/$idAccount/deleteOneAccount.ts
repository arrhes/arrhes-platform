import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneAccountRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneAccountRoute = authFactory.createApp()
    .post(
        deleteOneAccountRouteDefinition.path,
        bodyValidator(deleteOneAccountRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const deleteOneAccount = await deleteOne({
                database: c.var.clients.sql,
                table: models.account,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idAccount),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneAccountRouteDefinition.schemas.return,
                data: deleteOneAccount,
            })
        }
    )