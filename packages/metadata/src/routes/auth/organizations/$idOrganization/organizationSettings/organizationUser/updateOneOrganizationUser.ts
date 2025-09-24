import { routePath } from "#src/components/_index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "#src/schemas/organizationUser.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-organization-user`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
            idOrganization: organizationUserSchema.entries.idOrganization,
            isAdmin: v.optional(organizationUserSchema.entries.isAdmin),
        }),
        return: organizationUserSchemaReturn
    },
})
