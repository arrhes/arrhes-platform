import { dateTimeSchema, integerSchema, operation } from "../components/_index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { computationIncomeStatementModel } from "../models/computationIncomeStatement.js"
import * as v from "valibot"


export const computationIncomeStatementSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idComputation: v.nonNullable(idSchema),
    idIncomeStatement: v.nonNullable(idSchema),
    index: v.nonNullable(integerSchema),
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
        "index",
        "operation",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)