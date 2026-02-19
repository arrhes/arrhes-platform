import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../utilities/apiFactory.js"
import { apiLog } from "../../utilities/apiLog.js"
import { response } from "../../utilities/response.js"
import { insertOne } from "../../utilities/sql/insertOne.js"
import { updateOne } from "../../utilities/sql/updateOne.js"
import { models, generateId, mollieWebhookRouteDefinition } from "@arrhes/application-metadata"

export const mollieWebhookRoute = apiFactory.createApp().post(mollieWebhookRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: mollieWebhookRouteDefinition.schemas.body,
    })

    try {
        // Fetch the payment from Mollie to verify its status
        const molliePayment = await c.var.clients.mollie.payments.get(body.id)

        apiLog({
            var: c.var,
            type: "information",
            message: `Mollie webhook received for payment ${body.id}, status: ${molliePayment.status}`,
        })

        // Find the matching payment in our database
        const existingPayments = await c.var.clients.sql
            .select()
            .from(models.organizationPayment)
            .where(eq(models.organizationPayment.molliePaymentId, body.id))
            .limit(1)

        const existingPayment = existingPayments.at(0)

        // Map Mollie status to our status
        const statusMap: Record<string, "pending" | "paid" | "failed" | "refunded"> = {
            open: "pending",
            pending: "pending",
            authorized: "pending",
            paid: "paid",
            failed: "failed",
            canceled: "failed",
            expired: "failed",
        }
        const mappedStatus = statusMap[molliePayment.status] ?? "pending"

        if (existingPayment !== undefined) {
            // Update existing payment
            await updateOne({
                database: c.var.clients.sql,
                table: models.organizationPayment,
                data: {
                    status: mappedStatus,
                    paidAt: mappedStatus === "paid" ? new Date().toISOString() : existingPayment.paidAt,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => eq(table.id, existingPayment.id),
            })

            // If first payment is paid, create a Mollie subscription
            if (mappedStatus === "paid" && existingPayment.sequenceType === "first") {
                const organization = await c.var.clients.sql
                    .select()
                    .from(models.organization)
                    .where(eq(models.organization.id, existingPayment.idOrganization))
                    .limit(1)
                    .then((rows) => rows.at(0))

                if (
                    organization !== undefined &&
                    organization.mollieCustomerId !== null &&
                    organization.mollieSubscriptionId === null
                ) {
                    const subscription = await c.var.clients.mollie.customerSubscriptions.create({
                        customerId: organization.mollieCustomerId,
                        amount: {
                            currency: "EUR",
                            value: "9.99",
                        },
                        interval: "1 month",
                        description: "Arrhes - Abonnement mensuel",
                        webhookUrl: `${c.var.env.API_BASE_URL}/public/mollie-webhook`,
                    })

                    // Update organization with subscription info and premium status
                    await updateOne({
                        database: c.var.clients.sql,
                        table: models.organization,
                        data: {
                            mollieSubscriptionId: subscription.id,
                            subcriptionEndingAt: new Date().toISOString(),
                            lastUpdatedAt: new Date().toISOString(),
                        },
                        where: (table) => eq(table.id, organization.id),
                    })
                }
            }
        } else {
            // This is a subscription payment (Mollie created it automatically)
            // Find the organization by the customer ID from the Mollie payment
            const mollieCustomerId = molliePayment.customerId

            if (mollieCustomerId !== null && mollieCustomerId !== undefined) {
                const organizations = await c.var.clients.sql
                    .select()
                    .from(models.organization)
                    .where(eq(models.organization.mollieCustomerId, mollieCustomerId))
                    .limit(1)

                const organization = organizations.at(0)

                if (organization !== undefined) {
                    // Create a new payment record for this subscription payment
                    await insertOne({
                        database: c.var.clients.sql,
                        table: models.organizationPayment,
                        data: {
                            id: generateId(),
                            idOrganization: organization.id,
                            status: mappedStatus,
                            molliePaymentId: body.id,
                            mollieSubscriptionId: molliePayment.subscriptionId ?? null,
                            sequenceType: "recurring",
                            amountInCents: Math.round(Number.parseFloat(molliePayment.amount.value) * 100),
                            currency: molliePayment.amount.currency,
                            description: molliePayment.description,
                            periodStart: null,
                            periodEnd: null,
                            paidAt: mappedStatus === "paid" ? new Date().toISOString() : null,
                            createdAt: new Date().toISOString(),
                            lastUpdatedAt: null,
                            createdBy: null,
                            lastUpdatedBy: null,
                        },
                    })

                    // If payment is paid, ensure premium is active
                    if (mappedStatus === "paid") {
                        await updateOne({
                            database: c.var.clients.sql,
                            table: models.organization,
                            data: {
                                subcriptionEndingAt: organization.subcriptionEndingAt ?? new Date().toISOString(),
                                lastUpdatedAt: new Date().toISOString(),
                            },
                            where: (table) => eq(table.id, organization.id),
                        })
                    }
                }
            }
        }
    } catch (error) {
        apiLog({
            var: c.var,
            type: "error",
            internalMessage: `Mollie webhook error for payment ${body.id}`,
            cause: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        })
    }

    // Always return 200 to Mollie
    return response({
        context: c,
        statusCode: 200,
        schema: mollieWebhookRouteDefinition.schemas.return,
        data: {},
    })
})
