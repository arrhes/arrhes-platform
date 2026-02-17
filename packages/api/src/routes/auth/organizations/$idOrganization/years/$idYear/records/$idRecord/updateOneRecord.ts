import { models } from "@arrhes/application-metadata/models"
import { updateOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"

export const updateOneRecordRoute = authFactory.createApp().post(updateOneRecordRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneRecordRouteDefinition.schemas.body,
    })

    const updateRecord = await c.var.clients.sql.transaction(async (tx) => {
        const updateRecord = await updateOne({
            database: tx,
            table: models.record,
            data: {
                idJournal: body.idJournal,
                idFile: body.idFile,
                label: body.label,
                date: body.date,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: c.var.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idRecord),
                ),
        })

        return updateRecord
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneRecordRouteDefinition.schemas.return,
        data: updateRecord,
    })
})
