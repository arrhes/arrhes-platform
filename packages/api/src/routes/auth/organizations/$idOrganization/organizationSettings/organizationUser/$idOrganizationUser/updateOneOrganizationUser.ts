import { authFactory } from "../../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../utilities/sql/updateOne.js"
import { bodyValidator } from "../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { updateOneOrganizationUserRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneOrganizationUserRoute = authFactory.createApp()
    .post(
        updateOneOrganizationUserRouteDefinition.path,
        bodyValidator(updateOneOrganizationUserRouteDefinition.schemas.body),
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

            if (body.idOrganizationUser === organizationUser.id) {
                if (body.isAdmin === false) {
                    throw new Exception({
                        statusCode: 400,
                        internalMessage: "User cannot update himself",
                        externalMessage: "Vous ne pouvez pas vous modifier vous-même",
                    })
                }
            }
            const updateOneOrganizationUser = await updateOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                data: {
                    isAdmin: body.isAdmin,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    eq(table.id, body.idOrganizationUser)
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneOrganizationUserRouteDefinition.schemas.return,
                data: updateOneOrganizationUser,
            })
        }
    )