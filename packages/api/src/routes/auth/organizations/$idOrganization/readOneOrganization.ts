import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneOrganizationRouteDefinition } from "@arrhes/schemas/routes"
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