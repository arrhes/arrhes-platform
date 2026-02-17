import { models } from "@arrhes/application-metadata/models"
import { updateOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"

export const updateOneYearRoute = authFactory.createApp().post(updateOneYearRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneYearRouteDefinition.schemas.body,
    })

    const updateOneYear = await updateOne({
        database: c.var.clients.sql,
        table: models.year,
        data: {
            idYearPrevious: body.idYearPrevious,
            label: body.label,
            startingAt: body.startingAt,
            endingAt: body.endingAt,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: c.var.user.id,
        },
        where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.id, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneYearRouteDefinition.schemas.return,
        data: updateOneYear,
    })
})
