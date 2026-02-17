import { models } from "@arrhes/application-metadata/models"
import { readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readOneYearRoute = authFactory.createApp().post(readOneYearRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneYearRouteDefinition.schemas.body,
    })

    const readOneYear = await selectOne({
        database: c.var.clients.sql,
        table: models.year,
        where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.id, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneYearRouteDefinition.schemas.return,
        data: readOneYear,
    })
})
