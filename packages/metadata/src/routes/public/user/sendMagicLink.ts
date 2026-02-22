import { routePath } from "../../../components/_index.js"
import { userSchema } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
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
