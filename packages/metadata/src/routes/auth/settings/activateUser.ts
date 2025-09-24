import { routePath } from "#src/components/_index.js"
import { userSchema, userSchemaReturn } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const activateUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/activate-user`,
    schemas: {
        body: v.object({
            emailToken: v.nonNullable(userSchema.entries.emailToken)
        }),
        return: userSchemaReturn
    },
})

