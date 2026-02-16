import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { organizationUserSchema } from "../../../../../../schemas/organizationUser.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const deleteOneOrganizationUserRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-organization-user`,
    schemas: {
        body: v.object({
            idOrganizationUser: organizationUserSchema.entries.id,
            idOrganization: organizationUserSchema.entries.idOrganization,
        }),
        return: v.object({}),
    },
})
