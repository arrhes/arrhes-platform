import { routePath } from "#src/components/_index.js"
import { recordRowSchema, recordRowSchemaReturn } from "#src/schemas/recordRow.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllRecordRowsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-record-rows`,
    schemas: {
        body: v.object({
            idOrganization: recordRowSchema.entries.idOrganization,
            idYear: recordRowSchema.entries.idYear,
            idRecord: v.optional(recordRowSchema.entries.idRecord),
        }),
        return: v.array(recordRowSchemaReturn)
    },
})
