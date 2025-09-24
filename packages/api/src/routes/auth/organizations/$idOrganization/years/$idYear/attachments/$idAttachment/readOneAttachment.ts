import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { readOneAttachmentRouteDefinition } from "@arrhes/metadata/routes"
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
