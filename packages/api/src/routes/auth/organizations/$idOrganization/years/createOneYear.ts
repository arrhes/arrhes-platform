import { createOneYearRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"

export const createOneYearRoute = apiFactory.createApp().post(createOneYearRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneYearRouteDefinition.schemas.body,
    })

    const createOneYear = await insertOne({
        database: c.var.clients.sql,
        table: models.year,
        data: {
            id: generateId(),
            idOrganization: body.idOrganization,
            idYearPrevious: body.idYearPrevious,
            isClosed: false,
            closedAt: null,
            label: body.label ?? `Exercice ${new Date(body.startingAt).getFullYear()}`,
            startingAt: body.startingAt,
            endingAt: body.endingAt,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneYearRouteDefinition.schemas.return,
        data: createOneYear,
    })
})
