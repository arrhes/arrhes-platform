import { models } from "@arrhes/application-metadata/models"
import { and, eq } from "drizzle-orm"
import { createMiddleware } from "hono/factory"
import type { AuthEnv } from "../factories/authFactory.js"
import { Exception } from "../utilities/exception.js"

export const subscriptionMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
    try {
        const body = await c.req.json()
        const idOrganization: string | undefined = body.idOrganization

        if (idOrganization === undefined) {
            throw new Exception({
                internalMessage: "Subscription check failed",
                cause: "idOrganization not found in request body",
            })
        }

        const organizationUsers = await c.var.clients.sql
            .select()
            .from(models.organizationUser)
            .where(
                and(
                    eq(models.organizationUser.idOrganization, idOrganization),
                    eq(models.organizationUser.idUser, c.var.user.id),
                ),
            )
            .limit(1)

        const organizationUser = organizationUsers.at(0)
        if (organizationUser === undefined) {
            throw new Exception({
                internalMessage: "Subscription check failed",
                cause: "User is not a member of this organization",
            })
        }

        const organizations = await c.var.clients.sql
            .select()
            .from(models.organization)
            .where(eq(models.organization.id, idOrganization))
            .limit(1)

        const organization = organizations.at(0)
        if (organization === undefined) {
            throw new Exception({
                internalMessage: "Subscription check failed",
                cause: "Organization not found",
            })
        }

        if (organization.premiumAt === null) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Subscription check failed",
                externalMessage: "This feature requires a premium subscription",
                cause: "Organization does not have a premium subscription",
            })
        }

        await next()
    } catch (error: unknown) {
        if (error instanceof Exception) {
            throw error
        }

        throw new Exception({
            statusCode: 403,
            internalMessage: "Subscription check failed",
            externalMessage: "This feature requires a premium subscription",
            rawError: error,
        })
    }
})
