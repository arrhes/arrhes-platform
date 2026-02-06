import { routePath } from "../../../../../../../../../components/_index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-computation`,
    schemas: {
        body: v.object({
            idComputation: computationSchema.entries.id,
            idOrganization: computationSchema.entries.idOrganization,
            idYear: computationSchema.entries.idYear,
            index: v.optional(computationSchema.entries.index),
            number: v.optional(computationSchema.entries.number),
            label: v.optional(computationSchema.entries.label),
        }),
        return: computationSchemaReturn
    },
})
