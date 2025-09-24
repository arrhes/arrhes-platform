import { routePath } from "#src/components/_index.js"
import { documentSchema } from "#src/schemas/document.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const generateDocumentGetSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-document-get-signed-url`,
    schemas: {
        body: v.object({
            idDocument: documentSchema.entries.id,
            idOrganization: documentSchema.entries.idOrganization,
            idYear: documentSchema.entries.idYear,
        }),
        return: v.object({
            url: v.string()
        })
    },
})
