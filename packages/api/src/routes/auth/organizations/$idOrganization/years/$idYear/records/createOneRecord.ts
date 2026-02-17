import { models } from "@arrhes/application-metadata/models"
import { createOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"

export const createOneRecordRoute = authFactory.createApp().post(createOneRecordRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneRecordRouteDefinition.schemas.body,
    })

    const createOneRecord = await insertOne({
        database: c.var.clients.sql,
        table: models.record,
        data: {
            id: generateId(),
            idOrganization: body.idOrganization,
            idYear: body.idYear,
            idJournal: body.idJournal,
            idFile: body.idFile,
            label: body.label,
            date: body.date,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: c.var.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneRecordRouteDefinition.schemas.return,
        data: createOneRecord,
    })
})
