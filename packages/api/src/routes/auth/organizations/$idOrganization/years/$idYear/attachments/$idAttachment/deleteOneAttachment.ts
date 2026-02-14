import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../utilities/sql/deleteOne.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { deleteObject } from "../../../../../../../../utilities/storage/deleteObject.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { deleteOneAttachmentRouteDefinition } from "@arrhes/application-metadata/routes"
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
