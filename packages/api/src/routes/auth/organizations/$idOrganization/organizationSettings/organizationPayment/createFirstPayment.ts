import { models } from "@arrhes/application-metadata/models"
import { createFirstPaymentRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { SequenceType } from "@mollie/api-client"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const createFirstPaymentRoute = authFactory
    .createApp()
    .post(createFirstPaymentRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: createFirstPaymentRouteDefinition.schemas.body,
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

        // Create or retrieve Mollie customer
        let mollieCustomerId = organization.mollieCustomerId

        if (mollieCustomerId === null) {
            const customer = await c.var.clients.mollie.customers.create({
                name: organization.name,
                email: organization.email ?? c.var.user.email,
            })
            mollieCustomerId = customer.id

            await updateOne({
                database: c.var.clients.sql,
                table: models.organization,
                data: {
                    mollieCustomerId: mollieCustomerId,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => eq(table.id, organization.id),
            })
        }

        // Create the first payment with Mollie
        const molliePayment = await c.var.clients.mollie.payments.create({
            amount: {
                currency: "EUR",
                value: "0.01",
            },
            customerId: mollieCustomerId,
            sequenceType: SequenceType.first,
            description: "Arrhes - Activation de l'abonnement",
            redirectUrl: `${c.var.env.WEBSITE_BASE_URL}/dashboard/organisations/${organization.id}/paramètres/abonnement`,
            webhookUrl: `${c.var.env.API_BASE_URL}/public/mollie-webhook`,
        })

        // Store the payment in our database
        await insertOne({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            data: {
                id: generateId(),
                idOrganization: organization.id,
                status: "pending",
                molliePaymentId: molliePayment.id,
                sequenceType: "first",
                amountInCents: 1,
                currency: "EUR",
                description: "Activation de l'abonnement",
                periodStart: null,
                periodEnd: null,
                paidAt: null,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: c.var.user.id,
                lastUpdatedBy: null,
            },
        })

        const checkoutUrl = molliePayment.getCheckoutUrl()
        if (checkoutUrl === null) {
            throw new Exception({
                statusCode: 500,
                internalMessage: "Mollie checkout URL not available",
            })
        }

        return response({
            context: c,
            statusCode: 200,
            schema: createFirstPaymentRouteDefinition.schemas.return,
            data: {
                checkoutUrl: checkoutUrl,
            },
        })
    })
