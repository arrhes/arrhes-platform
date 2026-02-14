import { createRoute } from "@tanstack/react-router"
import { AttachmentsPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/attachments/attachmentsPage.js"
import { attachmentsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js"


export const attachmentsRoute = createRoute({
    getParentRoute: () => attachmentsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <AttachmentsPage />
    )
})
