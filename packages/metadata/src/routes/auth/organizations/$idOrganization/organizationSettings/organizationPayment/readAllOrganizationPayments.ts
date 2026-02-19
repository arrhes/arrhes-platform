import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { organizationPaymentSchemaReturn } from "../../../../../../schemas/organizationPayment.js"
import { organizationUserSchema } from "../../../../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const readAllOrganizationPaymentsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-organization-payments`,
    schemas: {
        body: v.object({
            idOrganization: organizationUserSchema.entries.idOrganization,
        }),
        return: v.array(organizationPaymentSchemaReturn),
    },
})
