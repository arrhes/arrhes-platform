import * as v from "valibot"
import { booleanSchema, dateTimeSchema, numericSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { recordRowModel } from "../models/recordRow.js"

export const recordRowSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idRecord: v.nonNullable(idSchema),
    idAccount: v.nonNullable(idSchema),
    flag: v.nullable(stringSchema),
    isComputedForJournalReport: v.nonNullable(booleanSchema),
    isComputedForLedgerReport: v.nonNullable(booleanSchema),
    isComputedForBalanceReport: v.nonNullable(booleanSchema),
    isComputedForBalanceSheetReport: v.nonNullable(booleanSchema),
    isComputedForIncomeStatementReport: v.nonNullable(booleanSchema),
    label: v.nullable(varcharSchema({ maxLength: 256 })),
    debit: v.nonNullable(numericSchema),
    credit: v.nonNullable(numericSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof recordRowModel.$inferSelect>

export const recordRowSchemaReturn = v.pick(recordRowSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idRecord",
    "idAccount",
    "flag",
    "isComputedForJournalReport",
    "isComputedForLedgerReport",
    "isComputedForBalanceReport",
    "isComputedForBalanceSheetReport",
    "isComputedForIncomeStatementReport",
    "label",
    "debit",
    "credit",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
