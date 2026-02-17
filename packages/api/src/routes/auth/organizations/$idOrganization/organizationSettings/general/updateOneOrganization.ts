import { models } from "@arrhes/application-metadata/models"
import { updateOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const updateOneOrganizationRoute = authFactory
    .createApp()
    .post(updateOneOrganizationRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneOrganizationRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, c.var.user.id), eq(table.idOrganization, body.idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
            })
        }

        const updateOneOrganization = await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                siren: body.siren,
                name: body.name,
                email: body.email,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: c.var.user.id,
            },
            where: (table) => eq(table.id, organizationUser.idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneOrganizationRouteDefinition.schemas.return,
            data: updateOneOrganization,
        })
    })
