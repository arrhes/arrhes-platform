import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { readOneOrganizationRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const readOneOrganizationRoute = authFactory.createApp()
    .post(
        readOneOrganizationRouteDefinition.path,
        bodyValidator(readOneOrganizationRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const organizationUser = await selectOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idUser, c.var.user.id),
                    )
                )
            })

            const readOneOrganization = await selectOne({
                database: c.var.clients.sql,
                table: models.organization,
                where: (table) => (
                    eq(table.id, organizationUser.idOrganization)
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneOrganizationRouteDefinition.schemas.return,
                data: readOneOrganization,
            })
        }
    )