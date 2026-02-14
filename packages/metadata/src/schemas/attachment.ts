import { dateTimeSchema, integerSchema, stringSchema } from "../components/_index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { attachmentModel } from "../models/attachment.js"
import * as v from "valibot"


export const attachmentSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    reference: v.nonNullable(varcharSchema({ maxLength: 256 })),
    label: v.nullable(varcharSchema({ maxLength: 256 })),
    date: v.nonNullable(dateTimeSchema),
    storageKey: v.nullable(stringSchema),
    type: v.nullable(stringSchema),
    size: v.nullable(integerSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof attachmentModel.$inferSelect>


export const attachmentSchemaReturn = v.pick(
    attachmentSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "reference",
        "label",
        "date",
        "storageKey",
        "type",
        "size",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)