import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { attachmentSchema, attachmentSchemaReturn } from "../../../../../../../schemas/attachment.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

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
        return: attachmentSchemaReturn,
    },
})
