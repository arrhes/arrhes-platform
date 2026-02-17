import { models } from "@arrhes/application-metadata/models"
import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneBalanceSheetRoute = authFactory
    .createApp()
    .post(readOneBalanceSheetRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneBalanceSheetRouteDefinition.schemas.body,
        })

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
    })
