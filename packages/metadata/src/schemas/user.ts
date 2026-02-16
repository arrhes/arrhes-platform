import * as v from "valibot"
import { booleanSchema, dateTimeSchema, emailSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { userModel } from "../models/user.js"

export const userSchema = v.object({
    id: v.nonNullable(idSchema),
    isActive: v.nonNullable(booleanSchema),
    alias: v.nullable(varcharSchema({ maxLength: 256 })),
    email: v.nonNullable(emailSchema),
    isEmailValidated: v.nonNullable(booleanSchema),
    emailToValidate: v.nullable(emailSchema),
    emailToken: v.nullable(stringSchema),
    emailTokenExpiresAt: v.nullable(dateTimeSchema),
    passwordHash: v.nonNullable(stringSchema),
    passwordSalt: v.nonNullable(stringSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof userModel.$inferSelect>

export const userSchemaReturn = v.pick(userSchema, [
    "id",
    "isActive",
    "alias",
    "email",
    "isEmailValidated",
    "emailToValidate",
    "emailToken",
    "emailTokenExpiresAt",
    "passwordHash",
    "passwordSalt",
    "createdAt",
    "lastUpdatedAt",
])
