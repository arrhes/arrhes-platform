import { authFactory } from "../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { bodyValidator } from "../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readAllOrganizationUsersRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const readAllOrganizationUsersRoute = authFactory.createApp()
    .post(
        readAllOrganizationUsersRouteDefinition.path,
        bodyValidator(readAllOrganizationUsersRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")
            const idOrganization = body.idOrganization

            const organizationUser = await selectOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                where: (table) => (
                    and(
                        eq(table.idUser, c.var.user.id),
                        eq(table.idOrganization, idOrganization),
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

            const readAllOrganizationUsers = await c.var.clients.sql.query.organizationUserModel.findMany({
                where: (table) => (
                    and(
                        eq(table.idOrganization, organizationUser.idOrganization)
                    )
                ),
                with: {
                    user: true,
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllOrganizationUsersRouteDefinition.schemas.return,
                data: readAllOrganizationUsers,
            })
        }
    )