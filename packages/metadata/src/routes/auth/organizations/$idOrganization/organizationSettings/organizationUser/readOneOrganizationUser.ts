import { routePath } from "#src/components/_index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "#src/schemas/organizationUser.js"
import { userSchemaReturn } from "#src/schemas/user.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-organization-user`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
            idOrganization: organizationUserSchema.entries.idOrganization,
        }),
        return: v.object({
            ...organizationUserSchemaReturn.entries,
            user: v.object({
                id: userSchemaReturn.entries.id,
                email: userSchemaReturn.entries.email,
                alias: userSchemaReturn.entries.alias,
            })
        })
    },
})
