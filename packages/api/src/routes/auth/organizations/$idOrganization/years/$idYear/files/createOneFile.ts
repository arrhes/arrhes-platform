import { models } from "@arrhes/application-metadata/models"
import { createOneFileRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"

export const createOneFileRoute = authFactory.createApp().post(createOneFileRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneFileRouteDefinition.schemas.body,
    })

    const createOneFile = await insertOne({
        database: c.var.clients.sql,
        table: models.file,
        data: {
            id: generateId(),
            idOrganization: body.idOrganization,
            idYear: body.idYear,
            reference: body.reference,
            name: body.name,
            storageKey: null,
            type: null,
            size: null,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: c.var.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneFileRouteDefinition.schemas.return,
        data: createOneFile,
    })
})
