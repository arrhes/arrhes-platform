import { routePath } from "../../../components/_index.js"
import { userSchemaReturn } from "../../../schemas/user.js"
import { userSessionSchemaReturn } from "../../../schemas/userSession.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
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
