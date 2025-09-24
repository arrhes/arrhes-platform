import { routePath } from "#src/components/_index.js"
import { computationSchema, computationSchemaReturn } from "#src/schemas/computation.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const generateComputationsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-computations`,
    schemas: {
        body: v.object({
            idOrganization: computationSchema.entries.idOrganization,
            idYear: computationSchema.entries.idYear,
        }),
        return: v.array(computationSchemaReturn)
    },
})
