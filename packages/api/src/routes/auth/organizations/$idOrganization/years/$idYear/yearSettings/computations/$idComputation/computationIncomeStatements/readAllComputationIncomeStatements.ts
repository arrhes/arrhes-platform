import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectMany } from "#/utilities/sql/selectMany.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readAllComputationIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const readAllComputationIncomeStatementsRoute = authFactory.createApp()
    .post(
        readAllComputationIncomeStatementsRouteDefinition.path,
        bodyValidator(readAllComputationIncomeStatementsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllComputationIncomeStatements = await selectMany({
                database: c.var.clients.sql,
                table: models.computationIncomeStatement,
                where: (table) => {
                    if (body.idComputation !== undefined) {
                        return (
                            and(
                                eq(table.idOrganization, body.idOrganization),
                                eq(table.idYear, body.idYear),
                                eq(table.idComputation, body.idComputation),
                            )
                        )
                    }
                    if (body.idIncomeStatement !== undefined) {
                        return (
                            and(
                                eq(table.idOrganization, body.idOrganization),
                                eq(table.idYear, body.idYear),
                                eq(table.idIncomeStatement, body.idIncomeStatement),
                            )
                        )
                    }
                    return (
                        and(
                            eq(table.idOrganization, body.idOrganization),
                            eq(table.idYear, body.idYear),
                        )
                    )
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllComputationIncomeStatementsRouteDefinition.schemas.return,
                data: readAllComputationIncomeStatements,
            })
        }
    )