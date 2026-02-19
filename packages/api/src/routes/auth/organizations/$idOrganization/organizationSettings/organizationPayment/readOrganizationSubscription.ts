import { models } from "@arrhes/application-metadata/models"
import { readOrganizationSubscriptionRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, desc, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readOrganizationSubscriptionRoute = authFactory
    .createApp()
    .post(readOrganizationSubscriptionRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOrganizationSubscriptionRouteDefinition.schemas.body,
        })

        // Verify user is member of the organization
        await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, c.var.user.id), eq(table.idOrganization, body.idOrganization)),
        })

        // Get organization
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, body.idOrganization),
        })

        // Get latest payment status
        const payments = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            where: (table) => eq(table.idOrganization, body.idOrganization),
            orderBy: (table) => desc(table.createdAt),
        })

        const latestPayment = payments.at(0)

        return response({
            context: c,
            statusCode: 200,
            schema: readOrganizationSubscriptionRouteDefinition.schemas.return,
            data: {
                isPremium: organization.premiumAt !== null,
                premiumAt: organization.premiumAt,
                mollieSubscriptionId: organization.mollieSubscriptionId,
                status: latestPayment?.status ?? null,
            },
        })
    })
