import { routePath } from "#src/components/_index.js"
import { organizationUserSchema } from "#src/schemas/organizationUser.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const activateOrganizationMembershipRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/activate-organization-membership`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
        }),
        return: v.object({})
    },
})
