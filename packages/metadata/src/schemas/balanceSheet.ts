import { balanceSheetSide, booleanSchema, dateTimeSchema, integerSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { varcharSchema } from "#src/components/schemas/varcharSchema.js"
import { balanceSheetModel } from "#src/models/balanceSheet.js"
import * as v from "valibot"


export const balanceSheetSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idBalanceSheetParent: v.nullable(idSchema),
    index: v.nonNullable(integerSchema),
    isDefault: v.nonNullable(booleanSchema),
    isComputed: v.nonNullable(booleanSchema),
    side: v.picklist(balanceSheetSide),
    number: v.nonNullable(varcharSchema({ maxLength: 32 })),
    label: v.nonNullable(varcharSchema({ maxLength: 256 })),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof balanceSheetModel.$inferSelect>


export const balanceSheetSchemaReturn = v.pick(
    balanceSheetSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "idBalanceSheetParent",
        "index",
        "isDefault",
        "isComputed",
        "side",
        "number",
        "label",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)