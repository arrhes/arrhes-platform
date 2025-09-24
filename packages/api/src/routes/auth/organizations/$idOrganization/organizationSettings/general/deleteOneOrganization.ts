import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneOrganizationRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneOrganizationRoute = authFactory.createApp()
    .post(
        deleteOneOrganizationRouteDefinition.path,
        bodyValidator(deleteOneOrganizationRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const organizationUser = await selectOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                where: (table) => (
                    and(
                        eq(table.idUser, c.var.user.id),
                        eq(table.idOrganization, body.idOrganization),
                    )
                )
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
                where: (table) => (
                    and(
                        eq(table.id, organizationUser.idOrganization),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneOrganizationRouteDefinition.schemas.return,
                data: deleteOneOrganization,
            })
        }
    )