import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneIncomeStatementRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneIncomeStatementRoute = authFactory.createApp()
    .post(
        readOneIncomeStatementRouteDefinition.path,
        bodyValidator(readOneIncomeStatementRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneIncomeStatement = await selectOne({
                database: c.var.clients.sql,
                table: models.incomeStatement,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idIncomeStatement),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneIncomeStatementRouteDefinition.schemas.return,
                data: readOneIncomeStatement,
            })
        }
    )
