import { models } from "@arrhes/application-metadata/models"
import { activateOrganizationMembershipRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const activateOrganizationMembershipRoute = authFactory
    .createApp()
    .post(activateOrganizationMembershipRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: activateOrganizationMembershipRouteDefinition.schemas.body,
        })

        const activateOrganizationUser = await updateOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            data: {
                status: "active",
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: c.var.user.id,
            },
            where: (table) => and(eq(table.id, body.idOrganizationUser), eq(table.idUser, c.var.user.id)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: activateOrganizationMembershipRouteDefinition.schemas.return,
            data: activateOrganizationUser,
        })
    })
