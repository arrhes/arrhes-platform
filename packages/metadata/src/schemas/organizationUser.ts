import * as v from "valibot"
import { booleanSchema, dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { organizationUserStatus } from "../components/values/organizationUserStatus.js"
import type { organizationUserModel } from "../models/organizationUser.js"

export const organizationUserSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idUser: v.nonNullable(idSchema),
    isAdmin: v.nonNullable(booleanSchema),
    status: v.nonNullable(v.picklist(organizationUserStatus)),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationUserModel.$inferSelect>

export const organizationUserSchemaReturn = v.pick(organizationUserSchema, [
    "id",
    "idOrganization",
    "idUser",
    "isAdmin",
    "status",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
