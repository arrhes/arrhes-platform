import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { createOneOrganizationUserRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"
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