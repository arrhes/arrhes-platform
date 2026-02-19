import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { idSchema } from "../../../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const createFirstPaymentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-first-payment`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema),
        }),
        return: v.object({
            checkoutUrl: v.string(),
        }),
    },
})
