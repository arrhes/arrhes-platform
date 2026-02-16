import { models } from "@arrhes/application-metadata/models"
import { readAllIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const readAllIncomeStatementsRoute = authFactory
    .createApp()
    .post(
        readAllIncomeStatementsRouteDefinition.path,
        bodyValidator(readAllIncomeStatementsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllIncomeStatements = await selectMany({
                database: c.var.clients.sql,
                table: models.incomeStatement,
                where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllIncomeStatementsRouteDefinition.schemas.return,
                data: readAllIncomeStatements,
            })
        },
    )
