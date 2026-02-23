import * as v from "valibot"
import { booleanSchema, dateTimeSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { apiKeyModel } from "../models/apiKey.js"

export const apiKeySchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idUser: v.nonNullable(idSchema),
    keyHash: v.nonNullable(stringSchema),
    name: v.nonNullable(stringSchema),
    isDefault: v.nonNullable(booleanSchema),
    isActive: v.nonNullable(booleanSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof apiKeyModel.$inferSelect>

export const apiKeySchemaReturn = v.pick(apiKeySchema, [
    "id",
    "idOrganization",
    "idUser",
    "name",
    "isDefault",
    "isActive",
    "createdAt",
    "lastUpdatedAt",
])
