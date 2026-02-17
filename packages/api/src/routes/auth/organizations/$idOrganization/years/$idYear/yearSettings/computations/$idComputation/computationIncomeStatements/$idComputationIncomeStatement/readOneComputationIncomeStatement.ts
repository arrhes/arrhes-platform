import { models } from "@arrhes/application-metadata/models"
import { readOneComputationIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../../../utilities/sql/selectOne.js"

export const readOneComputationIncomeStatementRoute = authFactory
    .createApp()
    .post(readOneComputationIncomeStatementRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneComputationIncomeStatementRouteDefinition.schemas.body,
        })

        const readOneComputationIncomeStatement = await selectOne({
            database: c.var.clients.sql,
            table: models.computationIncomeStatement,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idComputationIncomeStatement),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOneComputationIncomeStatementRouteDefinition.schemas.return,
            data: readOneComputationIncomeStatement,
        })
    })
