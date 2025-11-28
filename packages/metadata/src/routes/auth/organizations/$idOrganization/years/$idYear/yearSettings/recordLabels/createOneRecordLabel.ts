import { routePath } from "#src/components/_index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "#src/schemas/recordLabel.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-record-label`,
    schemas: {
        body: v.object({
            idOrganization: recordLabelSchema.entries.idOrganization,
            idYear: recordLabelSchema.entries.idYear,

            label: recordLabelSchema.entries.label,
        }),
        return: recordLabelSchemaReturn
    },
})
