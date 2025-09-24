import { routePath } from "#src/components/_index.js"
import { computationSchema, computationSchemaReturn } from "#src/schemas/computation.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-computation`,
    schemas: {
        body: v.object({
            idComputation: computationSchema.entries.id,
            idOrganization: computationSchema.entries.idOrganization,
            idYear: computationSchema.entries.idYear,
        }),
        return: computationSchemaReturn
    },
})
