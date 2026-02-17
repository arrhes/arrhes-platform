import { models } from "@arrhes/application-metadata/models"
import { deleteOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../utilities/sql/deleteOne.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const deleteOneOrganizationRoute = authFactory
    .createApp()
    .post(deleteOneOrganizationRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneOrganizationRouteDefinition.schemas.body,
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

        const deleteOneOrganization = await deleteOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => and(eq(table.id, organizationUser.idOrganization)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: deleteOneOrganizationRouteDefinition.schemas.return,
            data: deleteOneOrganization,
        })
    })
