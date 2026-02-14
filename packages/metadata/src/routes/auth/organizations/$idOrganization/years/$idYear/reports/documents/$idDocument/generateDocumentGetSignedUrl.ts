import { routePath } from "../../../../../../../../../components/_index.js"
import { documentSchema } from "../../../../../../../../../schemas/document.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
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
