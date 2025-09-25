import { AttachmentPage } from "#/features/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentPage.js"
import { attachmentLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const attachmentRoute = createRoute({
    getParentRoute: () => attachmentLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <AttachmentPage />
    ),
})

