import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneComputationIncomeStatementRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneComputationIncomeStatementRoute = authFactory.createApp()
    .post(
        deleteOneComputationIncomeStatementRouteDefinition.path,
        bodyValidator(deleteOneComputationIncomeStatementRouteDefinition.schemas.body),
        async (c) => {

            const body = c.req.valid("json")

            const deleteOneComputationIncomeStatement = await deleteOne({
                database: c.var.clients.sql,
                table: models.computationIncomeStatement,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idComputationIncomeStatement),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneComputationIncomeStatementRouteDefinition.schemas.return,
                data: deleteOneComputationIncomeStatement,
            })
        }
    )