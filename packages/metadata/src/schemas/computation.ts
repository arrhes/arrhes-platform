import { dateTimeSchema, integerSchema } from "../components/_index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { computationModel } from "../models/computation.js"
import * as v from "valibot"


export const computationSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    index: v.nonNullable(integerSchema),
    number: v.nonNullable(varcharSchema({ maxLength: 32 })),
    label: v.nonNullable(varcharSchema({ maxLength: 256 })),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof computationModel.$inferSelect>


export const computationSchemaReturn = v.pick(
    computationSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "index",
        "number",
        "label",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)