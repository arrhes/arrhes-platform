import { models } from "@arrhes/application-metadata/models"
import { readAllRecordLabelsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"

export const readAllRecordLabelsRoute = authFactory
    .createApp()
    .post(readAllRecordLabelsRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllRecordLabelsRouteDefinition.schemas.body,
        })

        const readAllRecordLabels = await selectMany({
            database: c.var.clients.sql,
            table: models.recordLabel,
            where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllRecordLabelsRouteDefinition.schemas.return,
            data: readAllRecordLabels,
        })
    })
