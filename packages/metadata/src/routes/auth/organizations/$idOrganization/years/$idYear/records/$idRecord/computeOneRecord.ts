import { routePath } from "#src/components/_index.js"
import { recordSchema, recordSchemaReturn } from "#src/schemas/record.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const computeOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/compute-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idOrganization: recordSchema.entries.idOrganization,
            idYear: recordSchema.entries.idYear,
        }),
        return: recordSchemaReturn
    },
})
