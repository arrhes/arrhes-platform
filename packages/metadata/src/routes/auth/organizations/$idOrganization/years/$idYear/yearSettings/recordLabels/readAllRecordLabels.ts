import { routePath } from "#src/components/_index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "#src/schemas/recordLabel.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllRecordLabelsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-record-labels`,
    schemas: {
        body: v.object({
            idOrganization: recordLabelSchema.entries.idOrganization,
            idYear: recordLabelSchema.entries.idYear,
        }),
        return: v.array(recordLabelSchemaReturn)
    },
})
