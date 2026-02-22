import { routePath } from "../../../components/_index.js"
import { userSchema, userSchemaReturn } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const validateUserEmailRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/validate-user-email`,
    schemas: {
        body: v.object({
            emailToken: v.nonNullable(userSchema.entries.emailToken)
        }),
        return: userSchemaReturn
    },
})
