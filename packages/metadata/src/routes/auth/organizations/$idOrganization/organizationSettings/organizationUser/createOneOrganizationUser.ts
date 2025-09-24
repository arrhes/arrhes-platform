import { routePath } from "#src/components/_index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "#src/schemas/organizationUser.js"
import { userSchema } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-organization-user`,
    schemas: {
        body: v.object({
            idOrganization: organizationUserSchema.entries.idOrganization,
            isAdmin: organizationUserSchema.entries.isAdmin,
            user: v.object({
                email: userSchema.entries.email,
            })
        }),
        return: organizationUserSchemaReturn
    },
})
