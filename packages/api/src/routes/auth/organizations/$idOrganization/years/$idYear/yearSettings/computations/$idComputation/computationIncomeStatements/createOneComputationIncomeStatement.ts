import { models } from "@arrhes/application-metadata/models"
import { createOneComputationIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../../../utilities/sql/insertOne.js"

export const createOneComputationIncomeStatementRoute = authFactory
    .createApp()
    .post(createOneComputationIncomeStatementRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneComputationIncomeStatementRouteDefinition.schemas.body,
        })

        const createOneComputationIncomeStatement = await insertOne({
            database: c.var.clients.sql,
            table: models.computationIncomeStatement,
            data: {
                id: generateId(),
                idOrganization: body.idOrganization,
                idYear: body.idYear,
                idComputation: body.idComputation,
                idIncomeStatement: body.idIncomeStatement,
                operation: body.operation,
                index: body.index,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: c.var.user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneComputationIncomeStatementRouteDefinition.schemas.return,
            data: createOneComputationIncomeStatement,
        })
    })
