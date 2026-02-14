import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "../../../../../../../../utilities/storage/generateGetSignedUrl.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { generateAttachmentGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const generateAttachmentGetSignedUrlRoute = authFactory.createApp()
    .post(
        generateAttachmentGetSignedUrlRouteDefinition.path,
        bodyValidator(generateAttachmentGetSignedUrlRouteDefinition.schemas.body),
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

            if (readOneAttachment.storageKey === null) {
                throw new Exception({
                    internalMessage: "Attachment storage key not found",
                    statusCode: 400,
                    externalMessage: "Le fichier associé n'existe pas"
                })
            }

            const url = await generateGetSignedUrl({
                var: c.var,
                storageKey: readOneAttachment.storageKey,
            })

            return response({
                context: c,
                statusCode: 200,
                schema: generateAttachmentGetSignedUrlRouteDefinition.schemas.return,
                data: {
                    url: url
                },
            })
        }
    )