import * as v from "valibot"
import { booleanSchema, dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { incomeStatementModel } from "../models/incomeStatement.js"

export const incomeStatementSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idIncomeStatementParent: v.nullable(idSchema),
    isDefault: v.nonNullable(booleanSchema),
    isComputed: v.nonNullable(booleanSchema),
    number: v.nonNullable(varcharSchema({ maxLength: 32 })),
    label: v.nonNullable(varcharSchema({ maxLength: 256 })),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof incomeStatementModel.$inferSelect>

export const incomeStatementSchemaReturn = v.pick(incomeStatementSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idIncomeStatementParent",
    "isDefault",
    "isComputed",
    "number",
    "label",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
