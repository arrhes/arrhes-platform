import { deleteOneAttachmentRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/deleteOneAttachment.js"
import { generateAttachmentGetSignedUrlRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/generateAttachmentGetSignedUrl.js"
import { generateAttachmentPutSignedUrlRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/generateAttachmentPutSignedUrl.js"
import { readOneAttachmentRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/readOneAttachment.js"
import { updateOneAttachmentRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/updateOneAttachment.js"


export const $idAttachmentRoutes = [
    deleteOneAttachmentRoute,
    generateAttachmentGetSignedUrlRoute,
    generateAttachmentPutSignedUrlRoute,
    readOneAttachmentRoute,
    updateOneAttachmentRoute,
]
