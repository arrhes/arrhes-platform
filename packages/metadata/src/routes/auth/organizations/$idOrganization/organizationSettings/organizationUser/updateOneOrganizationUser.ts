import { routePath } from "../../../../../../components/_index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"
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
