import { routePath } from "#src/components/_index.js"
import { attachmentSchema, attachmentSchemaReturn } from "#src/schemas/attachment.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneAttachmentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-attachment`,
    schemas: {
        body: v.object({
            idAttachment: attachmentSchema.entries.id,
            idOrganization: attachmentSchema.entries.idOrganization,
            idYear: attachmentSchema.entries.idYear,
            reference: v.optional(attachmentSchema.entries.reference),
            label: v.optional(attachmentSchema.entries.label),
            date: v.optional(attachmentSchema.entries.date),
        }),
        return: attachmentSchemaReturn
    },
})
