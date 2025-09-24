import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { createOneAttachmentRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const createOneAttachmentRoute = authFactory.createApp()
    .post(
        createOneAttachmentRouteDefinition.path,
        bodyValidator(createOneAttachmentRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const createOneAttachment = await insertOne({
                database: c.var.clients.sql,
                table: models.attachment,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    reference: body.reference,
                    label: body.label,
                    date: body.date,
                    storageKey: null,
                    type: null,
                    size: null,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneAttachmentRouteDefinition.schemas.return,
                data: createOneAttachment,
            })
        }
    )
