import { routePath, stringSchema } from "#src/components/_index.js"
import { userSchema } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const signInRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/sign-in`,
    schemas: {
        body: v.object({
            email: userSchema.entries.email,
            password: v.nonNullable(stringSchema)
        }),
        return: v.object({})
    },
})
