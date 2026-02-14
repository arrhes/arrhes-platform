import { passwordSchema, routePath } from "../../../components/_index.js"
import { userSchema } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const signUpRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/sign-up`,
    schemas: {
        body: v.object({
            email: userSchema.entries.email,
            password: passwordSchema,
            passwordCheck: passwordSchema,
        }),
        return: v.object({})
    },
})

