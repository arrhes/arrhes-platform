import * as v from "valibot"
import { dateTimeSchema, organizationPaymentStatus, routePath } from "../../../../../../components/index.js"
import { idSchema } from "../../../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const readOrganizationSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-organization-subscription`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema),
        }),
        return: v.object({
            isPremium: v.boolean(),
            subcriptionEndingAt: v.nullable(dateTimeSchema),
            mollieSubscriptionId: v.nullable(v.string()),
            status: v.nullable(v.picklist(organizationPaymentStatus)),
        }),
    },
})
