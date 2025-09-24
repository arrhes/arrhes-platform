import { createRoute } from "@tanstack/react-router"
import { AttachmentPage } from "features/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentPage"
import { attachmentLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentLayoutRoute"


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

