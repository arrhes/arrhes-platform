import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { createOneRecordRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const createOneRecordRoute = authFactory.createApp()
    .post(
        createOneRecordRouteDefinition.path,
        bodyValidator(createOneRecordRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const createOneRecord = await insertOne({
                database: c.var.clients.sql,
                table: models.record,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    idJournal: body.idJournal,
                    idAttachment: body.idAttachment,
                    label: body.label,
                    date: body.date,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneRecordRouteDefinition.schemas.return,
                data: createOneRecord,
            })
        }
    )