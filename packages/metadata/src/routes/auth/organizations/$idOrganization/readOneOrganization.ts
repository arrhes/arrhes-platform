import { routePath } from "../../../../components/_index.js"
import { organizationSchema, organizationSchemaReturn } from "../../../../schemas/organization.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-organization`,
    schemas: {
        body: v.object({
            idOrganization: organizationSchema.entries.id
        }),
        return: organizationSchemaReturn,
    },
})
