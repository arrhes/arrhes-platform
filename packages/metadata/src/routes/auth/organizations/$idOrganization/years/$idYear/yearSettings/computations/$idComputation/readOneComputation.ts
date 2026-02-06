import { routePath } from "../../../../../../../../../components/_index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
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
