import * as v from "valibot"
import { booleanSchema, dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { yearModel } from "../models/year.js"


export const yearSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYearPrevious: v.nullable(idSchema),
    // isGenerated: v.nonNullable(booleanSchema),
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
        // "isGenerated",
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