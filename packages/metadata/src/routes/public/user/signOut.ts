import { routePath } from "../../../components/_index.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const signOutRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/sign-out`,
    schemas: {
        body: v.object({}),
        return: v.object({})
    },
})
