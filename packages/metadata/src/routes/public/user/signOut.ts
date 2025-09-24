import { routePath } from "#src/components/_index.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const signOutRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/sign-out`,
    schemas: {
        body: v.object({}),
        return: v.object({})
    },
})
