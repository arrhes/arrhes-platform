import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { createOneBalanceSheetRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const createOneBalanceSheetRoute = authFactory.createApp()
    .post(
        createOneBalanceSheetRouteDefinition.path,
        bodyValidator(createOneBalanceSheetRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const createOneBalanceSheet = await insertOne({
                database: c.var.clients.sql,
                table: models.balanceSheet,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    idBalanceSheetParent: body.idBalanceSheetParent,
                    isDefault: false,
                    side: body.side,
                    number: body.number,
                    label: body.label,
                    grossAmountAdded: body.grossAmountAdded,
                    amortizationAmountAdded: body.amortizationAmountAdded,
                    netAmountAdded: body.netAmountAdded,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneBalanceSheetRouteDefinition.schemas.return,
                data: createOneBalanceSheet,
            })
        }
    )