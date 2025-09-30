import { dateTimeSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { varcharSchema } from "#src/components/schemas/varcharSchema.js"
import { recordLabelModel } from "#src/models/recordLabel.js"
import * as v from "valibot"


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


export const recordLabelSchemaReturn = v.pick(
    recordLabelSchema,
    [
        "id",
        "idOrganization",
        "idYear",

        "label",

        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)