import { createRoute } from "@tanstack/react-router"
import { AttachmentPage } from "../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentPage.js"
import { attachmentLayoutRoute } from "./attachmentLayoutRoute.js"


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

