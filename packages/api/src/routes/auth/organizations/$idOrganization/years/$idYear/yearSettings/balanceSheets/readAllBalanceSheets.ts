import { models } from "@arrhes/application-metadata/models"
import { readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const readAllBalanceSheetsRoute = authFactory
    .createApp()
    .post(
        readAllBalanceSheetsRouteDefinition.path,
        bodyValidator(readAllBalanceSheetsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllBalanceSheets = await selectMany({
                database: c.var.clients.sql,
                table: models.balanceSheet,
                where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllBalanceSheetsRouteDefinition.schemas.return,
                data: readAllBalanceSheets,
            })
        },
    )
