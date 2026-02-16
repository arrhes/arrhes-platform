import { models } from "@arrhes/application-metadata/models"
import { createOneRecordLabelRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const createOneRecordLabelRoute = authFactory
    .createApp()
    .post(
        createOneRecordLabelRouteDefinition.path,
        bodyValidator(createOneRecordLabelRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const createOneRecordLabel = await insertOne({
                database: c.var.clients.sql,
                table: models.recordLabel,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,

                    label: body.label,

                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                },
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneRecordLabelRouteDefinition.schemas.return,
                data: createOneRecordLabel,
            })
        },
    )
