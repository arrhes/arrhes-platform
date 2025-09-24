import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectMany } from "#src/utilities/sql/selectMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readAllIncomeStatementsRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readAllIncomeStatementsRoute = authFactory.createApp()
    .post(
        readAllIncomeStatementsRouteDefinition.path,
        bodyValidator(readAllIncomeStatementsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllIncomeStatements = await selectMany({
                database: c.var.clients.sql,
                table: models.incomeStatement,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllIncomeStatementsRouteDefinition.schemas.return,
                data: readAllIncomeStatements,
            })
        }
    )
