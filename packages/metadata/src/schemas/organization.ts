import * as v from "valibot"
import {
    booleanSchema,
    dateTimeSchema,
    emailSchema,
    integerSchema,
    organizationScope,
    sirenSchema,
} from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { organizationModel } from "../models/organization.js"

export const organizationSchema = v.object({
    id: v.nonNullable(idSchema),
    isArchived: v.nonNullable(booleanSchema),
    scope: v.nonNullable(v.picklist(organizationScope)),
    name: v.nonNullable(varcharSchema({ maxLength: 256 })),
    siren: v.nullable(sirenSchema),
    email: v.nullable(emailSchema),
    mollieCustomerId: v.nullable(v.string()),
    mollieSubscriptionId: v.nullable(v.string()),
    subcriptionEndingAt: v.nullable(dateTimeSchema),
    storageLimit: v.nonNullable(integerSchema),
    storageCurrentUsage: v.nonNullable(integerSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationModel.$inferSelect>

export const organizationSchemaReturn = v.pick(organizationSchema, [
    "id",
    "scope",
    "name",
    "siren",
    "email",
    "subcriptionEndingAt",
    "storageLimit",
    "storageCurrentUsage",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
