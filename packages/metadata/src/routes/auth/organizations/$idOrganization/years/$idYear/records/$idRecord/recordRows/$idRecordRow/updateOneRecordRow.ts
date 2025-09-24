import { routePath } from "#src/components/_index.js"
import { recordRowSchema, recordRowSchemaReturn } from "#src/schemas/recordRow.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-record-row`,
    schemas: {
        body: v.object({
            idRecordRow: recordRowSchema.entries.id,
            idOrganization: recordRowSchema.entries.idOrganization,
            idYear: recordRowSchema.entries.idYear,
            idRecord: v.optional(recordRowSchema.entries.idRecord),
            idAccount: v.optional(recordRowSchema.entries.idAccount),
            isComputed: v.optional(recordRowSchema.entries.isComputed),
            label: v.optional(recordRowSchema.entries.label),
            debit: v.optional(recordRowSchema.entries.debit),
            credit: v.optional(recordRowSchema.entries.credit),
        }),
        return: recordRowSchemaReturn
    },
})
