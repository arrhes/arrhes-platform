import { routePath, ticketType } from "#src/components/_index.js"
import { stringSchema } from "#src/components/schemas/stringSchema.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
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
