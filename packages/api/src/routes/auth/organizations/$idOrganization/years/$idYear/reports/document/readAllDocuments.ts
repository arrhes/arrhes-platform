import { models } from "@arrhes/application-metadata/models"
import { readAllDocumentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const readAllDocumentsRoute = authFactory
    .createApp()
    .post(
        readAllDocumentsRouteDefinition.path,
        bodyValidator(readAllDocumentsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllDocuments = await selectMany({
                database: c.var.clients.sql,
                table: models.document,
                where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllDocumentsRouteDefinition.schemas.return,
                data: readAllDocuments,
            })
        },
    )
