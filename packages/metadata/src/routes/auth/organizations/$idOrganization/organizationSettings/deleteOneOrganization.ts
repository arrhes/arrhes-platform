import { routePath } from "#src/components/_index.js"
import { organizationSchema } from "#src/schemas/organization.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"



export const deleteOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-organization`,
    schemas: {
        body: v.object({
            idOrganization: organizationSchema.entries.id,
        }),
        return: v.object({}),
    },
})
