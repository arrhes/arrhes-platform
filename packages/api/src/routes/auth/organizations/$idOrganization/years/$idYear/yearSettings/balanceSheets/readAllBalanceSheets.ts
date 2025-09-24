import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectMany } from "#src/utilities/sql/selectMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readAllBalanceSheetsRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readAllBalanceSheetsRoute = authFactory.createApp()
    .post(
        readAllBalanceSheetsRouteDefinition.path,
        bodyValidator(readAllBalanceSheetsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllBalanceSheets = await selectMany({
                database: c.var.clients.sql,
                table: models.balanceSheet,
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
                schema: readAllBalanceSheetsRouteDefinition.schemas.return,
                data: readAllBalanceSheets,
            })
        }
    )