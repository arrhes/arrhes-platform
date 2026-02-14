import { authFactory } from "../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { bodyValidator } from "../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { createOneOrganizationUserRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { and, eq } from "drizzle-orm"


export const createOneOrganizationUserRoute = authFactory.createApp()
    .post(
        createOneOrganizationUserRouteDefinition.path,
        bodyValidator(createOneOrganizationUserRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            // must be admin of the administration
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

            // the user must exist
            const user = await selectOne({
                database: c.var.clients.sql,
                table: models.user,
                where: (table) => (
                    eq(table.email, body.user.email)
                )
            })
            if (user === undefined) {
                throw new Exception({
                    statusCode: 404,
                    internalMessage: "User not found",
                    externalMessage: "Utilisateur non trouvé",
                })
            }

            const createOneOrganizationUser = await insertOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                data: {
                    id: generateId(),
                    idOrganization: organizationUser.idOrganization,
                    idUser: user.id,
                    isAdmin: body.isAdmin,
                    status: "invited",
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                }
            })

            //  await sendEmail({
            //                 to: updateUser.email,
            //                 subject: "Invitation à collaborer sur Coulba",
            //                 html: invitationTemplate({
            //                     urlInvitation: `${urlApp}/services/invitation?id=${updateUser.id}&token=${updateUser.invitationToken}`,
            //                     urlWebsite: urlWebsite
            //                 })
            //             })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneOrganizationUserRouteDefinition.schemas.return,
                data: createOneOrganizationUser,
            })
        }
    )