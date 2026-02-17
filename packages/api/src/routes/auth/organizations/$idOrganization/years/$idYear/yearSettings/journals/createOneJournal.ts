import { models } from "@arrhes/application-metadata/models"
import { createOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"

export const createOneJournalRoute = authFactory.createApp().post(createOneJournalRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneJournalRouteDefinition.schemas.body,
    })

    const createOneJournal = await insertOne({
        database: c.var.clients.sql,
        table: models.journal,
        data: {
            id: generateId(),
            idOrganization: body.idOrganization,
            idYear: body.idYear,
            code: body.code,
            label: body.label,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: c.var.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneJournalRouteDefinition.schemas.return,
        data: createOneJournal,
    })
})
