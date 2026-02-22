import { routePath } from "../../../components/_index.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { userSchema, userSchemaReturn } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
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