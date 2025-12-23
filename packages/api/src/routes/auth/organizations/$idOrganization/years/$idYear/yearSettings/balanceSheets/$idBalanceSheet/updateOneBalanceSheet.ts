import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { updateOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneBalanceSheetRoute = authFactory.createApp()
    .post(
        updateOneBalanceSheetRouteDefinition.path,
        bodyValidator(updateOneBalanceSheetRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updatedBalanceSheet = await updateOne({
                database: c.var.clients.sql,
                table: models.balanceSheet,
                data: {
                    idBalanceSheetParent: body.idBalanceSheetParent,
                    isComputed: body.isComputed,
                    number: body.number,
                    label: body.label,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
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
                schema: updateOneBalanceSheetRouteDefinition.schemas.return,
                data: updatedBalanceSheet,
            })
        }
    )