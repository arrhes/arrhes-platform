import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneComputationRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneComputationRoute = authFactory.createApp()
    .post(
        readOneComputationRouteDefinition.path,
        bodyValidator(readOneComputationRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneComputation = await selectOne({
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
                schema: readOneComputationRouteDefinition.schemas.return,
                data: readOneComputation,
            })
        }
    )
