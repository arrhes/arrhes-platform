import { models } from "@arrhes/application-metadata/models"
import { deleteOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneYearRoute = authFactory.createApp().post(deleteOneYearRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneYearRouteDefinition.schemas.body,
    })

    const deleteOneYear = await deleteOne({
        database: c.var.clients.sql,
        table: models.year,
        where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.id, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneYearRouteDefinition.schemas.return,
        data: deleteOneYear,
    })
})
