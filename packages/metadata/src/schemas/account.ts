import { accountType, balanceSheetFlow, booleanSchema, dateTimeSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { varcharSchema } from "#src/components/schemas/varcharSchema.js"
import { balanceSheetColumn } from "#src/components/values/balanceSheetColumn.js"
import { accountModel } from "#src/models/account.js"
import * as v from "valibot"


export const accountSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idAccountParent: v.nullable(idSchema),

    idBalanceSheet: v.nullable(idSchema),
    balanceSheetFlow: v.nullable(v.picklist(balanceSheetFlow)),
    balanceSheetColumn: v.nullable(v.picklist(balanceSheetColumn)),

    idIncomeStatement: v.nullable(idSchema),

    isMandatory: v.nonNullable(booleanSchema),
    isClass: v.nonNullable(booleanSchema),
    isSelectable: v.nonNullable(booleanSchema),
    isDefault: v.nonNullable(booleanSchema),
    number: v.nonNullable(varcharSchema({ maxLength: 32 })),
    label: v.nonNullable(varcharSchema({ maxLength: 256 })),
    type: v.nonNullable(v.picklist(accountType)),

    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof accountModel.$inferSelect>


export const accountSchemaReturn = v.pick(
    accountSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "idAccountParent",

        "idBalanceSheet",
        "balanceSheetFlow",
        "balanceSheetColumn",

        "idIncomeStatement",

        "isMandatory",
        "isClass",
        "isSelectable",
        "isDefault",
        "number",
        "label",
        "type",

        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)