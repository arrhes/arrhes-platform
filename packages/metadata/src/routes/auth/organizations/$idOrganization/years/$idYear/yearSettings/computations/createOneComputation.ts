import { routePath } from "../../../../../../../../components/_index.js"
import { computationSchema, computationSchemaReturn } from "../../../../../../../../schemas/computation.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneComputationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-computation`,
    schemas: {
        body: v.object({
            idOrganization: computationSchema.entries.idOrganization,
            idYear: computationSchema.entries.idYear,
            index: computationSchema.entries.index,
            number: computationSchema.entries.number,
            label: computationSchema.entries.label
        }),
        return: computationSchemaReturn
    },
})
