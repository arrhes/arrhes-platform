import { models } from "@arrhes/application-metadata/models"
import { readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../utilities/sql/selectMany.js"

export const readAllRecordsRoute = authFactory.createApp().post(readAllRecordsRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllRecordsRouteDefinition.schemas.body,
    })

    const readAllRecords = await selectMany({
        database: c.var.clients.sql,
        table: models.record,
        where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllRecordsRouteDefinition.schemas.return,
        data: readAllRecords,
    })
})
