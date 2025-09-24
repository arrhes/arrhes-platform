import { routePath } from "#src/components/_index.js"
import { organizationSchema, organizationSchemaReturn } from "#src/schemas/organization.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"



export const updateOneOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-organization`,
    schemas: {
        body: v.object({
            idOrganization: organizationSchema.entries.id,
            siren: v.optional(organizationSchema.entries.siren),
            name: v.optional(organizationSchema.entries.name),
            email: v.optional(organizationSchema.entries.email),
        }),
        return: organizationSchemaReturn,
    },
})
