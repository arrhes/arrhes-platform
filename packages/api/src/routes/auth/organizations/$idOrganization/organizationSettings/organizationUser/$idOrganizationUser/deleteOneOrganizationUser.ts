import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneOrganizationUserRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneOrganizationUserRoute = authFactory.createApp()
    .post(
        deleteOneOrganizationUserRouteDefinition.path,
        bodyValidator(deleteOneOrganizationUserRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            // Check if the user is admin of the organization
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
                    externalMessage: "Vous n'êtes pas administrateur de l'organisation",
                })
            }

            const deleteOneOrganizationUser = await deleteOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                where: (table) => (
                    and(
                        eq(table.id, body.idOrganizationUser),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneOrganizationUserRouteDefinition.schemas.return,
                data: deleteOneOrganizationUser,
            })
        }
    )