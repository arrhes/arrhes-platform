import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { deleteOne } from "#/utilities/sql/deleteOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { deleteOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneBalanceSheetRoute = authFactory.createApp()
    .post(
        deleteOneBalanceSheetRouteDefinition.path,
        bodyValidator(deleteOneBalanceSheetRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const deleteOneBalanceSheet = await deleteOne({
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
                schema: deleteOneBalanceSheetRouteDefinition.schemas.return,
                data: deleteOneBalanceSheet,
            })
        }
    )