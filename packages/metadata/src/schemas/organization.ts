import { booleanSchema, dateTimeSchema, emailSchema, organizationScope, sirenSchema } from "../components/_index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { organizationModel } from "../models/organization.js"
import * as v from "valibot"


export const organizationSchema = v.object({
    id: v.nonNullable(idSchema),
    isArchived: v.nonNullable(booleanSchema),
    scope: v.nonNullable(v.picklist(organizationScope)),
    name: v.nonNullable(varcharSchema({ maxLength: 256 })),
    siren: v.nullable(sirenSchema),
    email: v.nullable(emailSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationModel.$inferSelect>


export const organizationSchemaReturn = v.pick(
    organizationSchema,
    [
        "id",
        "scope",
        "name",
        "siren",
        "email",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)