import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectMany } from "#src/utilities/sql/selectMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readAllComputationIncomeStatementsRouteDefinition } from "@arrhes/schemas/routes"
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