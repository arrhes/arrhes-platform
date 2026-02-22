import { routePath } from "../../../../../../components/_index.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "../../../../../../schemas/organizationUser.js"
import { userSchemaReturn } from "../../../../../../schemas/user.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllOrganizationUsersRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-organization-users`,
    schemas: {
        body: v.object({
            idOrganization: organizationUserSchema.entries.idOrganization,
        }),
        return: v.array(
            v.object({
                ...organizationUserSchemaReturn.entries,
                user: v.object({
                    id: userSchemaReturn.entries.id,
                    email: userSchemaReturn.entries.email,
                    alias: userSchemaReturn.entries.alias,
                })
            })
        )
    },
})
