import { routePath } from "../../../components/_index.js"
import { userSchema, userSchemaReturn } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
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
