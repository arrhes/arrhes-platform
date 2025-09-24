import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { deleteObject } from "#src/utilities/storage/deleteObject.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneAttachmentRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneAttachmentRoute = authFactory.createApp()
    .post(
        deleteOneAttachmentRouteDefinition.path,
        bodyValidator(deleteOneAttachmentRouteDefinition.schemas.body),
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

            if (readOneAttachment.storageKey !== null) {
                const deleteObjectResponse = await deleteObject({
                    var: c.var,
                    storageKey: readOneAttachment.storageKey,
                })
            }

            const deleteOneAttachment = await deleteOne({
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
                schema: deleteOneAttachmentRouteDefinition.schemas.return,
                data: deleteOneAttachment,
            })
        }
    )
