import { models } from "@arrhes/application-metadata/models"
import { readAllIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"

export const readAllIncomeStatementsRoute = authFactory
    .createApp()
    .post(readAllIncomeStatementsRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllIncomeStatementsRouteDefinition.schemas.body,
        })

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
    })
