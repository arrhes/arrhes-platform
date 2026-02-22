import { routePath } from "../../../../../../../components/_index.js"
import { attachmentSchema, attachmentSchemaReturn } from "../../../../../../../schemas/attachment.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllAttachmentsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-attachments`,
    schemas: {
        body: v.object({
            idOrganization: attachmentSchema.entries.idOrganization,
            idYear: attachmentSchema.entries.idYear,
        }),
        return: v.array(attachmentSchemaReturn)
    },
})
