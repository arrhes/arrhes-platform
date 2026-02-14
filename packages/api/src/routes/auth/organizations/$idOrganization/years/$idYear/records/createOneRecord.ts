import { authFactory } from "../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"
import { bodyValidator } from "../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { createOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"


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