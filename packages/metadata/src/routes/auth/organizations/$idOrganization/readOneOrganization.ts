import { routePath } from "#src/components/_index.js"
import { organizationSchema, organizationSchemaReturn } from "#src/schemas/organization.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
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
