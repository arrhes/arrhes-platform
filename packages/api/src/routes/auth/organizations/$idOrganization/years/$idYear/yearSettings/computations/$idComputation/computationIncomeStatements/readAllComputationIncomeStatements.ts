import { models } from "@arrhes/application-metadata/models"
import { readAllComputationIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../../../utilities/sql/selectMany.js"

export const readAllComputationIncomeStatementsRoute = authFactory
    .createApp()
    .post(readAllComputationIncomeStatementsRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllComputationIncomeStatementsRouteDefinition.schemas.body,
        })

        const readAllComputationIncomeStatements = await selectMany({
            database: c.var.clients.sql,
            table: models.computationIncomeStatement,
            where: (table) => {
                if (body.idComputation !== undefined) {
                    return and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.idComputation, body.idComputation),
                    )
                }
                if (body.idIncomeStatement !== undefined) {
                    return and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.idIncomeStatement, body.idIncomeStatement),
                    )
                }
                return and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear))
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllComputationIncomeStatementsRouteDefinition.schemas.return,
            data: readAllComputationIncomeStatements,
        })
    })
