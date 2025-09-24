import { routePath } from "#src/components/_index.js"
import { userSchema } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const sendMagicLinkRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/send-magic-link`,
    schemas: {
        body: v.object({
            email: v.nonNullable(userSchema.entries.email)
        }),
        return: v.object({})
    },
})
