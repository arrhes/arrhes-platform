import { routePath } from "#src/components/_index.js"
import { recordSchema, recordSchemaReturn } from "#src/schemas/record.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllRecordsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-records`,
    schemas: {
        body: v.object({
            idOrganization: recordSchema.entries.idOrganization,
            idYear: recordSchema.entries.idYear,
        }),
        return: v.array(recordSchemaReturn)
    },
})
