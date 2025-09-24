import { routePath } from "#src/components/_index.js"
import { userSchema, userSchemaReturn } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-user`,
    schemas: {
        body: v.object({
            alias: v.optional(userSchema.entries.alias)
        }),
        return: userSchemaReturn
    },
})
