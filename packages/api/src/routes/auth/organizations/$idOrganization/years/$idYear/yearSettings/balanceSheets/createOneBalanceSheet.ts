import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { createOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"


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
                    isComputed: body.isComputed,
                    side: body.side,
                    number: body.number,
                    label: body.label,
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