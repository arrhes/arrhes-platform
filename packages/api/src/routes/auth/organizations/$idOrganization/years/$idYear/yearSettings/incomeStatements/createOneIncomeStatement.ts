import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { createOneIncomeStatementRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const createOneIncomeStatementRoute = authFactory.createApp()
    .post(
        createOneIncomeStatementRouteDefinition.path,
        bodyValidator(createOneIncomeStatementRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const createOneIncomeStatement = await insertOne({
                database: c.var.clients.sql,
                table: models.incomeStatement,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    idIncomeStatementParent: body.idIncomeStatementParent,
                    isDefault: false,
                    number: body.number,
                    label: body.label,
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
                schema: createOneIncomeStatementRouteDefinition.schemas.return,
                data: createOneIncomeStatement,
            })
        }
    )
