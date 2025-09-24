import { booleanSchema, dateTimeSchema, numericSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { varcharSchema } from "#src/components/schemas/varcharSchema.js"
import { incomeStatementModel } from "#src/models/incomeStatement.js"
import * as v from "valibot"


export const incomeStatementSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idIncomeStatementParent: v.nullable(idSchema),
    isDefault: v.nonNullable(booleanSchema),
    number: v.nonNullable(varcharSchema({ maxLength: 32 })),
    label: v.nonNullable(varcharSchema({ maxLength: 256 })),
    netAmountAdded: v.nonNullable(numericSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof incomeStatementModel.$inferSelect>


export const incomeStatementSchemaReturn = v.pick(
    incomeStatementSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "idIncomeStatementParent",
        "isDefault",
        "number",
        "label",
        "netAmountAdded",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)