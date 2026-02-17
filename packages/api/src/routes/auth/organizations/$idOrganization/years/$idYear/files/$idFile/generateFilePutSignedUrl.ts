import { models } from "@arrhes/application-metadata/models"
import { generateFilePutSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"
import { generatePutSignedUrl } from "../../../../../../../../utilities/storage/generatePutSignedUrl.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const generateFilePutSignedUrlRoute = authFactory
    .createApp()
    .post(
        generateFilePutSignedUrlRouteDefinition.path,
        bodyValidator(generateFilePutSignedUrlRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            if (body.size > 10_000_000) {
                throw new Exception({
                    internalMessage: "File size is too big",
                    statusCode: 500,
                    externalMessage: "Fichier trop volumineux",
                })
            }
            const storageKey = `organizations/${body.idOrganization}/${body.idYear}/files/${body.idFile}`

            const updateOneFile = await updateOne({
                database: c.var.clients.sql,
                table: models.file,
                data: {
                    storageKey: storageKey,
                    type: body.type,
                    size: body.size,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) =>
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idFile),
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
                    idUser: c.var.user.id,
                },
            })

            return response({
                context: c,
                statusCode: 200,
                schema: generateFilePutSignedUrlRouteDefinition.schemas.return,
                data: {
                    file: updateOneFile,
                    url: url,
                },
            })
        },
    )
