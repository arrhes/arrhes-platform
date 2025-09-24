import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { updateOneOrganizationRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const updateOneOrganizationRoute = authFactory.createApp()
    .post(
        updateOneOrganizationRouteDefinition.path,
        bodyValidator(updateOneOrganizationRouteDefinition.schemas.body),
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

            const updateOneOrganization = await updateOne({
                database: c.var.clients.sql,
                table: models.organization,
                data: {
                    siren: body.siren,
                    name: body.name,
                    email: body.email,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    eq(table.id, organizationUser.idOrganization)
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneOrganizationRouteDefinition.schemas.return,
                data: updateOneOrganization,
            })
        }
    )