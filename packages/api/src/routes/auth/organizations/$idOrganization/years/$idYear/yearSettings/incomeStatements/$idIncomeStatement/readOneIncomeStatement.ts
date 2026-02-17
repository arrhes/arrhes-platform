import { models } from "@arrhes/application-metadata/models"
import { readOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneIncomeStatementRoute = authFactory
    .createApp()
    .post(readOneIncomeStatementRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneIncomeStatementRouteDefinition.schemas.body,
        })

        const readOneIncomeStatement = await selectOne({
            database: c.var.clients.sql,
            table: models.incomeStatement,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idIncomeStatement),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOneIncomeStatementRouteDefinition.schemas.return,
            data: readOneIncomeStatement,
        })
    })
