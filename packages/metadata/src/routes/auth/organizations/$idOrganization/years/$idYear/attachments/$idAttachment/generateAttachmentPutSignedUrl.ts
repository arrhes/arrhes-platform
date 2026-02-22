import { routePath } from "../../../../../../../../components/_index.js"
import { attachmentSchema, attachmentSchemaReturn } from "../../../../../../../../schemas/attachment.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const generateAttachmentPutSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-attachment-put-signed-url`,
    schemas: {
        body: v.object({
            idAttachment: attachmentSchema.entries.id,
            idOrganization: attachmentSchema.entries.idOrganization,
            idYear: attachmentSchema.entries.idYear,
            type: v.nonNullable(attachmentSchema.entries.type.wrapped),
            size: v.nonNullable(attachmentSchema.entries.size.wrapped),
        }),
        return: v.object({
            attachment: attachmentSchemaReturn,
            url: v.string()
        })
    },
})
