import { routePath } from "#src/components/_index.js"
import { organizationUserSchema } from "#src/schemas/organizationUser.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-organization-user`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
            idOrganization: organizationUserSchema.entries.idOrganization,
        }),
        return: v.object({})
    },
})
