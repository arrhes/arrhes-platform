import { models } from "@arrhes/application-metadata/models"
import { deleteOneComputationIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneComputationIncomeStatementRoute = authFactory
    .createApp()
    .post(deleteOneComputationIncomeStatementRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneComputationIncomeStatementRouteDefinition.schemas.body,
        })

        const deleteOneComputationIncomeStatement = await deleteOne({
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
            schema: deleteOneComputationIncomeStatementRouteDefinition.schemas.return,
            data: deleteOneComputationIncomeStatement,
        })
    })
