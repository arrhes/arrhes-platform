import { models } from "@arrhes/application-metadata/models"
import { generateFileGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "../../../../../../../../utilities/storage/generateGetSignedUrl.js"

export const generateFileGetSignedUrlRoute = authFactory
    .createApp()
    .post(generateFileGetSignedUrlRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateFileGetSignedUrlRouteDefinition.schemas.body,
        })

        const readOneFile = await selectOne({
            database: c.var.clients.sql,
            table: models.file,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idFile),
                ),
        })

        if (readOneFile.storageKey === null) {
            throw new Exception({
                internalMessage: "File storage key not found",
                statusCode: 400,
                externalMessage: "Le fichier associé n'existe pas",
            })
        }

        const url = await generateGetSignedUrl({
            var: c.var,
            storageKey: readOneFile.storageKey,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateFileGetSignedUrlRouteDefinition.schemas.return,
            data: {
                url: url,
            },
        })
    })
