import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { insertOne } from "#/utilities/sql/insertOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { createOneComputationRouteDefinition } from "@arrhes/metadata/routes"
import { generateId } from "@arrhes/metadata/utilities"


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
                    index: body.index,
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
