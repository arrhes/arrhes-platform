import { booleanSchema, dateTimeSchema, stringSchema } from "#src/components/_index.js"
import { idSchema } from "#src/components/schemas/idSchema.js"
import { userSessionModel } from "#src/models/userSession.js"
import * as v from "valibot"


export const userSessionSchema = v.object({
    id: v.nonNullable(idSchema),
    idUser: v.nonNullable(idSchema),
    isActive: v.nonNullable(booleanSchema),
    expiresAt: v.nonNullable(dateTimeSchema),
    ip: v.nullable(stringSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof userSessionModel.$inferSelect>


export const userSessionSchemaReturn = v.pick(
    userSessionSchema,
    [
        "id",
        "idUser",
        "isActive",
        "expiresAt",
        "ip",
        "lastUpdatedAt",
        "createdAt",
    ]
)