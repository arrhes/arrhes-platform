import { routePath } from "../../../../../../../components/_index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-record`,
    schemas: {
        body: v.object({
            idOrganization: recordSchema.entries.idOrganization,
            idYear: recordSchema.entries.idYear,
            idJournal: v.optional(recordSchema.entries.idJournal),
            idRecordLabel: v.optional(recordSchema.entries.idRecordLabel),
            idAttachment: v.optional(recordSchema.entries.idAttachment),
            label: recordSchema.entries.label,
            date: recordSchema.entries.date,
        }),
        return: recordSchemaReturn
    },
})
