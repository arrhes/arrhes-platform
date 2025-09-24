import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { generatePutSignedUrl } from "#src/utilities/storage/generatePutSignedUrl.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { generateAttachmentPutSignedUrlRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"
import { and, eq } from "drizzle-orm"


export const generateAttachmentPutSignedUrlRoute = authFactory.createApp()
    .post(
        generateAttachmentPutSignedUrlRouteDefinition.path,
        bodyValidator(generateAttachmentPutSignedUrlRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            if (body.size > 10_000_000) {
                throw new Exception({
                    internalMessage: "File size is too big",
                    statusCode: 500,
                    externalMessage: "Fichier trop volumineux"
                })
            }
            const storageKey = `organizations/${body.idOrganization}/${body.idYear}/${generateId()}`


            const updateOneAttachment = await updateOne({
                database: c.var.clients.sql,
                table: models.attachment,
                data: {
                    storageKey: storageKey,
                    type: body.type,
                    size: body.size,
                    lastUpdatedAt: new Date().toISOString()
                },
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idAttachment)
                    )
                ),
            })


            const url = await generatePutSignedUrl({
                var: c.var,
                storageKey: storageKey,
                contentLength: body.size,
                contentType: body.type,
                metadata: {
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    idUser: c.var.user.id
                },
            })

            return response({
                context: c,
                statusCode: 200,
                schema: generateAttachmentPutSignedUrlRouteDefinition.schemas.return,
                data: {
                    attachment: updateOneAttachment,
                    url: url,
                },
            })
        }
    )