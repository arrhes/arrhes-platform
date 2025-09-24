import { routePath } from "#src/components/_index.js"
import { booleanSchema } from "#src/components/schemas/booleanSchema.js"
import { accountSchema, accountSchemaReturn } from "#src/schemas/account.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const generateAccountsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-accounts`,
    schemas: {
        body: v.object({
            idOrganization: accountSchema.entries.idOrganization,
            idYear: accountSchema.entries.idYear,
            isMinimalSystem: v.nullable(booleanSchema),
            isReplicatingAccounts: v.nullable(booleanSchema),
        }),
        return: v.array(accountSchemaReturn)
    },
})
