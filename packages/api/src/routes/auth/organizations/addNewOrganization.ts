import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { addNewOrganizationRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const addNewOrganizationRoute = authFactory.createApp()
    .post(
        addNewOrganizationRouteDefinition.path,
        bodyValidator(addNewOrganizationRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const createOneOrganization = await c.var.clients.sql.transaction(async (tx) => {

                const createOneOrganization = await insertOne({
                    database: tx,
                    table: models.organization,
                    data: {
                        id: generateId(),
                        isArchived: false,
                        scope: body.scope,
                        siren: body.siren,
                        name: body.name,
                        email: body.email,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: c.var.user.id,
                        lastUpdatedBy: null,
                    }
                })

                const createOneOrganizationUser = await insertOne({
                    database: tx,
                    table: models.organizationUser,
                    data: {
                        id: generateId(),
                        idOrganization: createOneOrganization.id,
                        idUser: c.var.user.id,
                        isAdmin: true,
                        status: "active",
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: c.var.user.id,
                        lastUpdatedBy: null,
                    }
                })

                return createOneOrganization
            })


            return response({
                context: c,
                statusCode: 200,
                schema: addNewOrganizationRouteDefinition.schemas.return,
                data: createOneOrganization,
            })
        }
    )