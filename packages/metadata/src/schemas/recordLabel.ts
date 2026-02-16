import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { recordLabelModel } from "../models/recordLabel.js"

export const recordLabelSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),

    label: v.nonNullable(varcharSchema({ maxLength: 256 })),

    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof recordLabelModel.$inferSelect>

export const recordLabelSchemaReturn = v.pick(recordLabelSchema, [
    "id",
    "idOrganization",
    "idYear",

    "label",

    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
