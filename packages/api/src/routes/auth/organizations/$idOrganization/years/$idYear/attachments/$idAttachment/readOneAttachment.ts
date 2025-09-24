import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneAttachmentRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneAttachmentRoute = authFactory.createApp()
    .post(
        readOneAttachmentRouteDefinition.path,
        bodyValidator(readOneAttachmentRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneAttachment = await selectOne({
                database: c.var.clients.sql,
                table: models.attachment,
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
                schema: readOneAttachmentRouteDefinition.schemas.return,
                data: readOneAttachment,
            })
        }
    )
