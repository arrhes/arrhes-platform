import { routePath } from "../../../../../../../../components/_index.js"
import { attachmentSchema } from "../../../../../../../../schemas/attachment.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const generateAttachmentGetSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-attachment-get-signed-url`,
    schemas: {
        body: v.object({
            idAttachment: attachmentSchema.entries.id,
            idOrganization: attachmentSchema.entries.idOrganization,
            idYear: attachmentSchema.entries.idYear,
        }),
        return: v.object({
            url: v.string()
        })
    },
})
