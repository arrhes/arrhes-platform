import { routePath } from "../../../../../../../../components/_index.js"
import { documentSchema, documentSchemaReturn } from "../../../../../../../../schemas/document.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
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
