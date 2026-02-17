import { models } from "@arrhes/application-metadata/models"
import { readOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneComputationRoute = authFactory
    .createApp()
    .post(readOneComputationRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneComputationRouteDefinition.schemas.body,
        })

        const readOneComputation = await selectOne({
            database: c.var.clients.sql,
            table: models.computation,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idComputation),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOneComputationRouteDefinition.schemas.return,
            data: readOneComputation,
        })
    })
