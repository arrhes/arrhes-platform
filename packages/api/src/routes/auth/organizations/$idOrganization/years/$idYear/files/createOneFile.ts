import { models } from "@arrhes/application-metadata/models"
import { createOneFileRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"
import { bodyValidator } from "../../../../../../../validators/bodyValidator.js"

export const createOneFileRoute = authFactory
    .createApp()
    .post(createOneFileRouteDefinition.path, bodyValidator(createOneFileRouteDefinition.schemas.body), async (c) => {
        const body = c.req.valid("json")

        const createOneFile = await insertOne({
            database: c.var.clients.sql,
            table: models.file,
            data: {
                id: generateId(),
                idOrganization: body.idOrganization,
                idYear: body.idYear,
                reference: body.reference,
                label: body.label,
                date: body.date,
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
