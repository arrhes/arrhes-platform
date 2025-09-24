import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { createOneComputationRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const createOneComputationRoute = authFactory.createApp()
    .post(
        createOneComputationRouteDefinition.path,
        bodyValidator(createOneComputationRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const createOneComputation = await insertOne({
                database: c.var.clients.sql,
                table: models.computation,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    number: body.number,
                    label: body.label,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneComputationRouteDefinition.schemas.return,
                data: createOneComputation,
            })
        }
    )
