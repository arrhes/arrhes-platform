import * as v from "valibot"
import { dateTimeSchema, integerSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { fileModel } from "../models/file.js"

export const fileSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    reference: v.nullable(varcharSchema({ maxLength: 256 })),
    name: v.nullable(varcharSchema({ maxLength: 256 })),
    storageKey: v.nullable(stringSchema),
    type: v.nullable(stringSchema),
    size: v.nullable(integerSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof fileModel.$inferSelect>

export const fileSchemaReturn = v.pick(fileSchema, [
    "id",
    "idOrganization",
    "idYear",
    "reference",
    "name",
    "storageKey",
    "type",
    "size",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
