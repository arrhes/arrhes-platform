import { routePath } from "../../../components/_index.js"
import { organizationSchema, organizationSchemaReturn } from "../../../schemas/organization.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const addNewOrganizationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/add-new-organization`,
    schemas: {
        body: v.object({
            scope: organizationSchema.entries.scope,
            name: organizationSchema.entries.name,
            siren: v.optional(organizationSchema.entries.siren),
            email: v.optional(organizationSchema.entries.email),
        }),
        return: organizationSchemaReturn
    },
})

