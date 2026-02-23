import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { apiKeySchema, apiKeySchemaReturn } from "../../../../../../schemas/apiKey.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const readAllApiKeysRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-api-keys`,
    schemas: {
        body: v.object({
            idOrganization: apiKeySchema.entries.idOrganization,
        }),
        return: v.array(apiKeySchemaReturn),
    },
})
