import { models } from "@arrhes/application-metadata/models"
import { deleteOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneIncomeStatementRoute = authFactory
    .createApp()
    .post(deleteOneIncomeStatementRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneIncomeStatementRouteDefinition.schemas.body,
        })

        const deleteOneIncomeStatement = await deleteOne({
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
            schema: deleteOneIncomeStatementRouteDefinition.schemas.return,
            data: deleteOneIncomeStatement,
        })
    })
