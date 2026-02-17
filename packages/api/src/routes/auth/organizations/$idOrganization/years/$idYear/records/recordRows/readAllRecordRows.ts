import { models } from "@arrhes/application-metadata/models"
import { readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"

export const readAllRecordRowsRoute = authFactory.createApp().post(readAllRecordRowsRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllRecordRowsRouteDefinition.schemas.body,
    })

    const readAllRecordRows = await selectMany({
        database: c.var.clients.sql,
        table: models.recordRow,
        where: (table) => {
            if (body.idRecord !== null && body.idRecord !== undefined) {
                return and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.idRecord, body.idRecord),
                )
            }
            return and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear))
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllRecordRowsRouteDefinition.schemas.return,
        data: readAllRecordRows,
    })
})
