import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"
import { bodyValidator } from "../../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { updateOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneComputationRoute = authFactory.createApp()
    .post(
        updateOneComputationRouteDefinition.path,
        bodyValidator(updateOneComputationRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updateOneComputation = await updateOne({
                database: c.var.clients.sql,
                table: models.computation,
                data: {
                    number: body.number,
                    label: body.label,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
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
                schema: updateOneComputationRouteDefinition.schemas.return,
                data: updateOneComputation,
            })
        }
    )
