import { routePath } from "#src/components/_index.js"
import { attachmentSchema, attachmentSchemaReturn } from "#src/schemas/attachment.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneAttachmentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-attachment`,
    schemas: {
        body: v.object({
            idOrganization: attachmentSchema.entries.idOrganization,
            idYear: attachmentSchema.entries.idYear,
            reference: attachmentSchema.entries.reference,
            label: v.optional(attachmentSchema.entries.label),
            date: attachmentSchema.entries.date,
        }),
        return: attachmentSchemaReturn
    },
})
