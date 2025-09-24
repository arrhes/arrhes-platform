import { dateTimeSchema, operation } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { computationIncomeStatementModel } from "#src/models/computationIncomeStatement.js"
import * as v from "valibot"


export const computationIncomeStatementSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idComputation: v.nonNullable(idSchema),
    idIncomeStatement: v.nonNullable(idSchema),
    operation: v.nonNullable(v.picklist(operation)),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof computationIncomeStatementModel.$inferSelect>


export const computationIncomeStatementSchemaReturn = v.pick(
    computationIncomeStatementSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "idComputation",
        "idIncomeStatement",
        "operation",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)