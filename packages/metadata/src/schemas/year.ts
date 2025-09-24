import { booleanSchema, dateTimeSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { varcharSchema } from "#src/components/schemas/varcharSchema.js"
import { yearModel } from "#src/models/year.js"
import * as v from "valibot"


export const yearSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYearPrevious: v.nullable(idSchema),
    isClosed: v.nonNullable(booleanSchema),
    closedAt: v.nullable(dateTimeSchema),
    label: v.nonNullable(varcharSchema({ maxLength: 256 })),
    startingAt: v.nonNullable(dateTimeSchema, "Doit être une date valide"),
    endingAt: v.nonNullable(dateTimeSchema, "Doit être une date valide"),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof yearModel.$inferSelect>


export const yearSchemaReturn = v.pick(
    yearSchema,
    [
        "id",
        "idOrganization",
        "idYearPrevious",
        "isClosed",
        "closedAt",
        "label",
        "startingAt",
        "endingAt",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)