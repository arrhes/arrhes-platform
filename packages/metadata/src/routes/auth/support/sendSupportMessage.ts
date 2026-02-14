import { routePath, ticketType } from "../../../components/_index.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
import * as v from "valibot"



export const sendSupportMessageRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/send-support-message`,
    schemas: {
        body: v.object({
            category: v.nullable(v.picklist(ticketType)),
            message: v.nonNullable(stringSchema)
        }),
        return: v.object({})
    },
})
