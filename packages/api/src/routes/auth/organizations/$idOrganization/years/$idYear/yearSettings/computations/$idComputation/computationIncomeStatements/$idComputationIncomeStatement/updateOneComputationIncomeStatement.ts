import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { updateOneComputationIncomeStatementRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneComputationIncomeStatementRoute = authFactory.createApp()
    .post(
        updateOneComputationIncomeStatementRouteDefinition.path,
        bodyValidator(updateOneComputationIncomeStatementRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updateOneComputationIncomeStatement = await updateOne({
                database: c.var.clients.sql,
                table: models.computationIncomeStatement,
                data: {
                    idComputation: body.idComputation,
                    idIncomeStatement: body.idIncomeStatement,
                    operation: body.operation,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idComputationIncomeStatement)
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneComputationIncomeStatementRouteDefinition.schemas.return,
                data: updateOneComputationIncomeStatement,
            })
        }
    )