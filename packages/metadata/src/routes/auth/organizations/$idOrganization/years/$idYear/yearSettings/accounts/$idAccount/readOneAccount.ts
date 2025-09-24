import { routePath } from "#src/components/_index.js"
import { accountSchema, accountSchemaReturn } from "#src/schemas/account.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-account`,
    schemas: {
        body: v.object({
            idAccount: accountSchema.entries.id,
            idOrganization: accountSchema.entries.idOrganization,
            idYear: accountSchema.entries.idYear,
        }),
        return: accountSchemaReturn
    },
})
