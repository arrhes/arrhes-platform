import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectMany } from "#src/utilities/sql/selectMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readAllAccountsRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readAllAccountsRoute = authFactory.createApp()
    .post(
        readAllAccountsRouteDefinition.path,
        bodyValidator(readAllAccountsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllAccounts = await selectMany({
                database: c.var.clients.sql,
                table: models.account,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllAccountsRouteDefinition.schemas.return,
                data: readAllAccounts,
            })
        }
    )