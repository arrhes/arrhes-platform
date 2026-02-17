import { models } from "@arrhes/application-metadata/models"
import { readOneRecordRowRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneRecordRowRoute = authFactory.createApp().post(readOneRecordRowRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneRecordRowRouteDefinition.schemas.body,
    })

    const readOneRecordRow = await selectOne({
        database: c.var.clients.sql,
        table: models.recordRow,
        where: (table) =>
            and(
                eq(table.idOrganization, body.idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idRecordRow),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneRecordRowRouteDefinition.schemas.return,
        data: readOneRecordRow,
    })
})
