import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneAccountRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneAccountRoute = authFactory.createApp()
    .post(
        readOneAccountRouteDefinition.path,
        bodyValidator(readOneAccountRouteDefinition.schemas.body),
        async (c) => {

            const body = c.req.valid("json")

            const readOneAccount = await selectOne({
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
                schema: readOneAccountRouteDefinition.schemas.return,
                data: readOneAccount,
            })
        }
    )