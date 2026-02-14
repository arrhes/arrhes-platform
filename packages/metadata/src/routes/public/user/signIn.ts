import { routePath, stringSchema } from "../../../components/_index.js"
import { userSchema } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
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
