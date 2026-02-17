import { models } from "@arrhes/application-metadata/models"
import { closeYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq, not } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"

export const closeYearRoute = authFactory.createApp().post(closeYearRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: closeYearRouteDefinition.schemas.body,
    })

    const closeYear = await updateOne({
        database: c.var.clients.sql,
        table: models.year,
        data: {
            isClosed: not(models.year.isClosed),
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: c.var.user.id,
        },
        where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.id, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: closeYearRouteDefinition.schemas.return,
        data: closeYear,
    })
})
