import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneBalanceSheetRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneBalanceSheetRoute = authFactory.createApp()
    .post(
        readOneBalanceSheetRouteDefinition.path,
        bodyValidator(readOneBalanceSheetRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneBalanceSheet = await selectOne({
                database: c.var.clients.sql,
                table: models.balanceSheet,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idBalanceSheet),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneBalanceSheetRouteDefinition.schemas.return,
                data: readOneBalanceSheet,
            })
        }
    )