import { routePath } from "#src/components/_index.js"
import { passwordSchema } from "#src/components/schemas/passwordSchema.js"
import { stringSchema } from "#src/components/schemas/stringSchema.js"
import { userSchemaReturn } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateUserPasswordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-user-password`,
    schemas: {
        body: v.object({
            currentPassword: v.nonNullable(stringSchema, "Le mot de passe actuel doit être renseigné"),
            newPassword: v.nonNullable(passwordSchema, "Le nouveau mot de passe doit être renseigné"),
            newPasswordCheck: v.nonNullable(passwordSchema, "Le nouveau mot de passe doit être renseigné"),
        }),
        return: userSchemaReturn
    },
})
