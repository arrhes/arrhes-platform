import { routePath } from "#src/components/_index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "#src/schemas/recordLabel.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-record-label`,
    schemas: {
        body: v.object({
            idRecordLabel: recordLabelSchema.entries.id,
            idOrganization: recordLabelSchema.entries.idOrganization,
            idYear: recordLabelSchema.entries.idYear,

            label: v.optional(recordLabelSchema.entries.label),
        }),
        return: recordLabelSchemaReturn
    },
})
