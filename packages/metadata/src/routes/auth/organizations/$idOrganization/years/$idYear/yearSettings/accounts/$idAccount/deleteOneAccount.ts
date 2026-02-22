import { routePath } from "../../../../../../../../../components/_index.js"
import { accountSchema } from "../../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-account`,
    schemas: {
        body: v.object({
            idAccount: accountSchema.entries.id,
            idOrganization: accountSchema.entries.idOrganization,
            idYear: accountSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
