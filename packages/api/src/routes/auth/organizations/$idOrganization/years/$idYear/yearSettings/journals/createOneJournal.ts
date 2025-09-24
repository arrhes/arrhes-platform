import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { createOneJournalRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const createOneJournalRoute = authFactory.createApp()
    .post(
        createOneJournalRouteDefinition.path,
        bodyValidator(createOneJournalRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

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
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneJournalRouteDefinition.schemas.return,
                data: createOneJournal,
            })
        }
    )