import { models } from "@arrhes/application-metadata/models"
import { readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../validators/bodyValidator.js"

export const readAllFilesRoute = authFactory
    .createApp()
    .post(readAllFilesRouteDefinition.path, bodyValidator(readAllFilesRouteDefinition.schemas.body), async (c) => {
        const body = c.req.valid("json")

        const readAllFiles = await selectMany({
            database: c.var.clients.sql,
            table: models.file,
            where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllFilesRouteDefinition.schemas.return,
            data: readAllFiles,
        })
    })
