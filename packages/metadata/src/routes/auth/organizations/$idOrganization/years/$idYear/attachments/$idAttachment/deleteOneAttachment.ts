import { routePath } from "../../../../../../../../components/_index.js"
import { attachmentSchema } from "../../../../../../../../schemas/attachment.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneAttachmentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-attachment`,
    schemas: {
        body: v.object({
            idAttachment: attachmentSchema.entries.id,
            idOrganization: attachmentSchema.entries.idOrganization,
            idYear: attachmentSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
