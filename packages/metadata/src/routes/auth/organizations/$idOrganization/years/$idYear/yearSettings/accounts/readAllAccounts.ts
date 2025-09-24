import { routePath } from "#src/components/_index.js"
import { accountSchema, accountSchemaReturn } from "#src/schemas/account.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllAccountsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-accounts`,
    schemas: {
        body: v.object({
            idOrganization: accountSchema.entries.idOrganization,
            idYear: accountSchema.entries.idYear,
        }),
        return: v.array(accountSchemaReturn)
    },
})
