import { $idAttachmentRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/$idAttachmentRoutes.js"
import { createOneAttachmentRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/attachments/createOneAttachment.js"
import { readAllAttachmentsRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/attachments/readAllAttachments.js"


export const attachmentsRoutes = [
    createOneAttachmentRoute,
    readAllAttachmentsRoute,

    ...$idAttachmentRoutes,
]