import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { updateOneBalanceSheetRouteDefinition } from "@arrhes/schemas/routes"
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
                    number: body.number,
                    label: body.label,
                    grossAmountAdded: body.grossAmountAdded,
                    amortizationAmountAdded: body.amortizationAmountAdded,
                    netAmountAdded: body.netAmountAdded,
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