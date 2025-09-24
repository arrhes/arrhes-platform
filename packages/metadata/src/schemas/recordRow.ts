import { booleanSchema, dateTimeSchema, numericSchema, stringSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { varcharSchema } from "#src/components/schemas/varcharSchema.js"
import { recordRowModel } from "#src/models/recordRow.js"
import * as v from "valibot"


export const recordRowSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idRecord: v.nonNullable(idSchema),
    idAccount: v.nonNullable(idSchema),
    computedCode: v.nullable(stringSchema),
    isComputed: v.nonNullable(booleanSchema),
    label: v.nullable(varcharSchema({ maxLength: 256 })),
    debit: v.nonNullable(numericSchema),
    credit: v.nonNullable(numericSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof recordRowModel.$inferSelect>


export const recordRowSchemaReturn = v.pick(
    recordRowSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "idRecord",
        "idAccount",
        "computedCode",
        "isComputed",
        "label",
        "debit",
        "credit",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)