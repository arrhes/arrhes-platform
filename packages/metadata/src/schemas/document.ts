import { dateTimeSchema, documentType, stringSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { documentModel } from "#src/models/document.js"
import * as v from "valibot"


export const documentSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    label: v.nonNullable(stringSchema),
    type: v.nonNullable(v.picklist(documentType)),
    storageKey: v.nonNullable(stringSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof documentModel.$inferSelect>


export const documentSchemaReturn = v.pick(
    documentSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "label",
        "type",
        "storageKey",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)