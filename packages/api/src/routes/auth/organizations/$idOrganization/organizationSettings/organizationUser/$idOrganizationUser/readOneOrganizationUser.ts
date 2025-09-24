import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneOrganizationUserRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneOrganizationUserRoute = authFactory.createApp()
    .post(
        readOneOrganizationUserRouteDefinition.path,
        bodyValidator(readOneOrganizationUserRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const organizationUser = await selectOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                where: (table) => (
                    and(
                        eq(table.id, body.idOrganizationUser),
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

            const readOneOrganizationUser = await c.var.clients.sql.query.organizationUserModel.findFirst({
                where: (table) => (
                    and(
                        eq(table.id, body.idOrganizationUser),
                    )
                ),
                with: {
                    user: true,
                }
            })
            if (readOneOrganizationUser === undefined) {
                throw new Exception({
                    statusCode: 404,
                    internalMessage: "Organization user not found",
                    externalMessage: "Utilisateur de l'organisation introuvable",
                })
            }

            return response({
                context: c,
                statusCode: 200,
                schema: readOneOrganizationUserRouteDefinition.schemas.return,
                data: readOneOrganizationUser,
            })
        }
    )