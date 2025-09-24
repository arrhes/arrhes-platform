import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { updateOneAttachmentRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const updateOneAttachmentRoute = authFactory.createApp()
    .post(
        updateOneAttachmentRouteDefinition.path,
        bodyValidator(updateOneAttachmentRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updateOneAttachment = await updateOne({
                database: c.var.clients.sql,
                table: models.attachment,
                data: {
                    reference: body.reference,
                    label: body.label,
                    date: body.date,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idAttachment)
                    )
                ),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneAttachmentRouteDefinition.schemas.return,
                data: updateOneAttachment,
            })
        }
    )
