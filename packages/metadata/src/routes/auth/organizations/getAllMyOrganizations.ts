import { routePath } from "#src/components/_index.js"
import { organizationSchemaReturn } from "#src/schemas/organization.js"
import { organizationUserSchemaReturn } from "#src/schemas/organizationUser.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const getAllMyOrganizationsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/get-all-my-organization`,
    schemas: {
        body: v.object({}),
        return: v.array(
            v.object({
                ...organizationUserSchemaReturn.entries,
                organization: organizationSchemaReturn,
            })
        )
    },
})
