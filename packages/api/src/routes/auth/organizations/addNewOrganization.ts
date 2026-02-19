import { models } from "@arrhes/application-metadata/models"
import { addNewOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { authFactory } from "../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { response } from "../../../utilities/response.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"

export const addNewOrganizationRoute = authFactory
    .createApp()
    .post(addNewOrganizationRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: addNewOrganizationRouteDefinition.schemas.body,
        })

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
                },
            })

            const _createOneOrganizationUser = await insertOne({
                database: tx,
                table: models.organizationUser,
                data: {
                    id: generateId(),
                    idOrganization: createOneOrganization.id,
                    idUser: c.var.user.id,
                    isOwner: true,
                    isAdmin: true,
                    status: "active",
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                },
            })

            return createOneOrganization
        })

        return response({
            context: c,
            statusCode: 200,
            schema: addNewOrganizationRouteDefinition.schemas.return,
            data: createOneOrganization,
        })
    })
