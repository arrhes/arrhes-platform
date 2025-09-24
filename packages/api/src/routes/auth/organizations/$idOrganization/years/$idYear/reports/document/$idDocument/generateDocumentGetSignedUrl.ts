import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "#src/utilities/storage/generateGetSignedUrl.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { generateDocumentGetSignedUrlRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const generateDocumentGetSignedUrlRoute = authFactory.createApp()
    .post(
        generateDocumentGetSignedUrlRouteDefinition.path,
        bodyValidator(generateDocumentGetSignedUrlRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneDocument = await selectOne({
                database: c.var.clients.sql,
                table: models.document,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idDocument)
                    )
                ),
            })

            const url = await generateGetSignedUrl({
                var: c.var,
                storageKey: readOneDocument.storageKey,
            })

            return response({
                context: c,
                statusCode: 200,
                schema: generateDocumentGetSignedUrlRouteDefinition.schemas.return,
                data: {
                    url: url
                },
            })
        }
    )