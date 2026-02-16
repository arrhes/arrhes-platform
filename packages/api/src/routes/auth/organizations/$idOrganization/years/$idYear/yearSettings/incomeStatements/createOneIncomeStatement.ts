import { models } from "@arrhes/application-metadata/models"
import { createOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const createOneIncomeStatementRoute = authFactory
    .createApp()
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
                    isComputed: body.isComputed,
                    number: body.number,
                    label: body.label,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                },
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneIncomeStatementRouteDefinition.schemas.return,
                data: createOneIncomeStatement,
            })
        },
    )
