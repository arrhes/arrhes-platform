import { routePath } from "../../../../../../../../components/_index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
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
            idRecordLabel: v.optional(recordSchema.entries.idRecordLabel),
            idAttachment: v.optional(recordSchema.entries.idAttachment),
            label: v.optional(recordSchema.entries.label),
            date: v.optional(recordSchema.entries.date),
        }),
        return: recordSchemaReturn
    },
})
