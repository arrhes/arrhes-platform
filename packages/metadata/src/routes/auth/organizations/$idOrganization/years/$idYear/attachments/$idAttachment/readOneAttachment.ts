import { routePath } from "#src/components/_index.js"
import { attachmentSchema, attachmentSchemaReturn } from "#src/schemas/attachment.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneAttachmentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-attachment`,
    schemas: {
        body: v.object({
            idAttachment: attachmentSchema.entries.id,
            idOrganization: attachmentSchema.entries.idOrganization,
            idYear: attachmentSchema.entries.idYear,
        }),
        return: attachmentSchemaReturn
    },
})
