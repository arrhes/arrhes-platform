import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneComputationIncomeStatementRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneComputationIncomeStatementRoute = authFactory.createApp()
    .post(
        readOneComputationIncomeStatementRouteDefinition.path,
        bodyValidator(readOneComputationIncomeStatementRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneComputationIncomeStatement = await selectOne({
                database: c.var.clients.sql,
                table: models.computationIncomeStatement,
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
                schema: readOneComputationIncomeStatementRouteDefinition.schemas.return,
                data: readOneComputationIncomeStatement,
            })
        }
    )