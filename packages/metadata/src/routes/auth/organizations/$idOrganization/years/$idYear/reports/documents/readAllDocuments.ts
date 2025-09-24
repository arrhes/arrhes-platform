import { routePath } from "#src/components/_index.js"
import { documentSchema, documentSchemaReturn } from "#src/schemas/document.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllDocumentsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-documents`,
    schemas: {
        body: v.object({
            idOrganization: documentSchema.entries.idOrganization,
            idYear: documentSchema.entries.idYear,
        }),
        return: v.array(documentSchemaReturn)
    },
})
