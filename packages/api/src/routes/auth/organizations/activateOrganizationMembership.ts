import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { activateOrganizationMembershipRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const activateOrganizationMembershipRoute = authFactory.createApp()
    .post(
        activateOrganizationMembershipRouteDefinition.path,
        bodyValidator(activateOrganizationMembershipRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const activateOrganizationUser = await updateOne({
                database: c.var.clients.sql,
                table: models.organizationUser,
                data: {
                    status: "active",
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    and(
                        eq(table.id, body.idOrganizationUser),
                        eq(table.idUser, c.var.user.id),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: activateOrganizationMembershipRouteDefinition.schemas.return,
                data: activateOrganizationUser,
            })
        }
    )