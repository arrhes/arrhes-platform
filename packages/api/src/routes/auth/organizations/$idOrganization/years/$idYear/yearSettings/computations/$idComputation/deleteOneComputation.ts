import { models } from "@arrhes/application-metadata/models"
import { deleteOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneComputationRoute = authFactory
    .createApp()
    .post(deleteOneComputationRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneComputationRouteDefinition.schemas.body,
        })

        const deleteOneComputation = await deleteOne({
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
            schema: deleteOneComputationRouteDefinition.schemas.return,
            data: deleteOneComputation,
        })
    })
