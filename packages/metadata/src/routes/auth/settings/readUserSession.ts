import { routePath } from "#src/components/_index.js"
import { userSchemaReturn } from "#src/schemas/user.js"
import { userSessionSchemaReturn } from "#src/schemas/userSession.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readUserSessionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-user-session`,
    schemas: {
        body: v.object({}),
        return: v.object({
            ...userSessionSchemaReturn.entries,
            user: userSchemaReturn,
        })
    },
})
