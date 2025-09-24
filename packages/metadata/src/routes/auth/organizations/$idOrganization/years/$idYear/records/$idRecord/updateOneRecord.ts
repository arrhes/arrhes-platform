import { routePath } from "#src/components/_index.js"
import { recordSchema, recordSchemaReturn } from "#src/schemas/record.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idOrganization: recordSchema.entries.idOrganization,
            idYear: recordSchema.entries.idYear,
            idJournal: v.optional(recordSchema.entries.idJournal),
            idAttachment: v.optional(recordSchema.entries.idAttachment),
            label: v.optional(recordSchema.entries.label),
            date: v.optional(recordSchema.entries.date),
        }),
        return: recordSchemaReturn
    },
})
