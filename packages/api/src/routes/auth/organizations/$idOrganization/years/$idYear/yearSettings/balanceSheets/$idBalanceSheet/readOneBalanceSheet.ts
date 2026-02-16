import { models } from "@arrhes/application-metadata/models"
import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"
import { bodyValidator } from "../../../../../../../../../validators/bodyValidator.js"

export const readOneBalanceSheetRoute = authFactory
    .createApp()
    .post(
        readOneBalanceSheetRouteDefinition.path,
        bodyValidator(readOneBalanceSheetRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneBalanceSheet = await selectOne({
                database: c.var.clients.sql,
                table: models.balanceSheet,
                where: (table) =>
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idBalanceSheet),
                    ),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneBalanceSheetRouteDefinition.schemas.return,
                data: readOneBalanceSheet,
            })
        },
    )
