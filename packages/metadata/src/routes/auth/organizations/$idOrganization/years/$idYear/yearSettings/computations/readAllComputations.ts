import { routePath } from "../../../../../../../../components/_index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllComputationsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-computations`,
    schemas: {
        body: v.object({
            idOrganization: computationSchema.entries.idOrganization,
            idYear: computationSchema.entries.idYear,
        }),
        return: v.array(computationSchemaReturn)
    },
})
