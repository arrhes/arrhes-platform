import { routePath } from "../../../../../../../../../components/_index.js"
import { computationSchema } from "../../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-computation`,
    schemas: {
        body: v.object({
            idComputation: computationSchema.entries.id,
            idOrganization: computationSchema.entries.idOrganization,
            idYear: computationSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
