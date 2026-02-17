import { models } from "@arrhes/application-metadata/models"
import { generateDocumentGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "../../../../../../../../../utilities/storage/generateGetSignedUrl.js"

export const generateDocumentGetSignedUrlRoute = authFactory
    .createApp()
    .post(generateDocumentGetSignedUrlRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateDocumentGetSignedUrlRouteDefinition.schemas.body,
        })

        const readOneDocument = await selectOne({
            database: c.var.clients.sql,
            table: models.document,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idDocument),
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
                url: url,
            },
        })
    })
