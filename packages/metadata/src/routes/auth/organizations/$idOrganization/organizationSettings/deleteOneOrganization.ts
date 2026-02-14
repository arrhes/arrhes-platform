import { routePath } from "../../../../../components/_index.js"
import { organizationSchema } from "../../../../../schemas/organization.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"
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
