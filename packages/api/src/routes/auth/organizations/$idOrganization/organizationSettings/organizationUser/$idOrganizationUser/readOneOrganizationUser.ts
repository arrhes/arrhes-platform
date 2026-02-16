import { models } from "@arrhes/application-metadata/models"
import { readOneOrganizationUserRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../utilities/sql/selectOne.js"
import { bodyValidator } from "../../../../../../../validators/bodyValidator.js"

export const readOneOrganizationUserRoute = authFactory
    .createApp()
    .post(
        readOneOrganizationUserRouteDefinition.path,
        bodyValidator(readOneOrganizationUserRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const organizationUser = await selectOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                where: (table) => and(eq(table.id, body.idOrganizationUser)),
            })
            if (organizationUser.isAdmin === false) {
                throw new Exception({
                    statusCode: 401,
                    internalMessage: "User is not admin of the organization",
                    externalMessage: "Vous n'êtes pas administrateur de l'organisation",
                })
            }

            const readOneOrganizationUser = await c.var.clients.sql.query.organizationUserModel.findFirst({
                where: (table) => and(eq(table.id, body.idOrganizationUser)),
                with: {
                    user: true,
                },
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
        },
    )
