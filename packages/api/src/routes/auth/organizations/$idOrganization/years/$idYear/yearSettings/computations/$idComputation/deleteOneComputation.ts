import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../utilities/sql/deleteOne.js"
import { bodyValidator } from "../../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { deleteOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneComputationRoute = authFactory.createApp()
    .post(
        deleteOneComputationRouteDefinition.path,
        bodyValidator(deleteOneComputationRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const deleteOneComputation = await deleteOne({
                database: c.var.clients.sql,
                table: models.computation,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idComputation)
                    )
                ),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneComputationRouteDefinition.schemas.return,
                data: deleteOneComputation,
            })
        }
    )
