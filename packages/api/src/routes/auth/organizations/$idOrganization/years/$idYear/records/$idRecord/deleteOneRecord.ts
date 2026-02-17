import { models } from "@arrhes/application-metadata/models"
import { deleteOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneRecordRoute = authFactory.createApp().post(deleteOneRecordRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneRecordRouteDefinition.schemas.body,
    })

    const deleteOneRecord = await deleteOne({
        database: c.var.clients.sql,
        table: models.record,
        where: (table) =>
            and(
                eq(table.idOrganization, body.idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idRecord),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneRecordRouteDefinition.schemas.return,
        data: deleteOneRecord,
    })
})
