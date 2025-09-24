import { routePath } from "#src/components/_index.js"
import { recordRowSchema, recordRowSchemaReturn } from "#src/schemas/recordRow.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-record-row`,
    schemas: {
        body: v.object({
            idOrganization: recordRowSchema.entries.idOrganization,
            idYear: recordRowSchema.entries.idYear,
            idRecord: recordRowSchema.entries.idRecord,
            idAccount: recordRowSchema.entries.idAccount,
            isComputed: v.optional(recordRowSchema.entries.isComputed),
            label: v.optional(recordRowSchema.entries.label),
            debit: v.optional(recordRowSchema.entries.debit),
            credit: v.optional(recordRowSchema.entries.credit),
        }),
        return: recordRowSchemaReturn
    },
})
