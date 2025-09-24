import { routePath } from "#src/components/_index.js"
import { computationSchema, computationSchemaReturn } from "#src/schemas/computation.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-computation`,
    schemas: {
        body: v.object({
            idOrganization: computationSchema.entries.idOrganization,
            idYear: computationSchema.entries.idYear,
            number: computationSchema.entries.number,
            label: computationSchema.entries.label
        }),
        return: computationSchemaReturn
    },
})
