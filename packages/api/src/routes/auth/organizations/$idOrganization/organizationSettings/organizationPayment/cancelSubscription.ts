import { models } from "@arrhes/application-metadata/models"
import { cancelSubscriptionRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const cancelSubscriptionRoute = authFactory
    .createApp()
    .post(cancelSubscriptionRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: cancelSubscriptionRouteDefinition.schemas.body,
        })

        // Verify user is admin of the organization
        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, c.var.user.id), eq(table.idOrganization, body.idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
            })
        }

        // Get the organization
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, body.idOrganization),
        })

        if (organization.mollieCustomerId === null || organization.mollieSubscriptionId === null) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "No active subscription to cancel",
                externalMessage: "Aucun abonnement actif à annuler",
            })
        }

        // Cancel the subscription on Mollie
        await c.var.clients.mollie.customerSubscriptions.cancel(organization.mollieSubscriptionId, {
            customerId: organization.mollieCustomerId,
        })

        // Update the organization
        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                mollieSubscriptionId: null,
                premiumAt: null,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: c.var.user.id,
            },
            where: (table) => eq(table.id, organization.id),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: cancelSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
