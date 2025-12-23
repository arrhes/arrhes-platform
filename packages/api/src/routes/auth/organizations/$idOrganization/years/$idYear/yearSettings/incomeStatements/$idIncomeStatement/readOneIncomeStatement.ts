import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
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
