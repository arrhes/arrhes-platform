import { models } from "@arrhes/application-metadata/models"
import { createOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"

export const createOneYearRoute = authFactory.createApp().post(createOneYearRouteDefinition.path, async (c) => {
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
            createdBy: c.var.user.id,
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
