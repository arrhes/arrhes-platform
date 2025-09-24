import { routePath } from "#src/components/_index.js"
import { stringSchema } from "#src/components/schemas/stringSchema.js"
import { userSchema, userSchemaReturn } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateUserEmailRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-user-email`,
    schemas: {
        body: v.object({
            currentPassword: v.nonNullable(stringSchema, "Le mot de passe doit être renseigné"),
            emailToValidate: v.nonNullable(userSchema.entries.emailToValidate, "L'email doit être renseigné")
        }),
        return: userSchemaReturn
    },
})