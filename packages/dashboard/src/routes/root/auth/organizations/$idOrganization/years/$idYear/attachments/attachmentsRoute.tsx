import { AttachmentsPage } from "#/features/organizations/$idOrganization/years/$idYear/attachments/attachmentsPage.js"
import { attachmentsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
