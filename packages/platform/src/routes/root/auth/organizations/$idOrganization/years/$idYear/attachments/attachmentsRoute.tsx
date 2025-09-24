import { createRoute } from "@tanstack/react-router"
import { AttachmentsPage } from "features/organizations/$idOrganization/years/$idYear/attachments/attachmentsPage"
import { attachmentsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute"


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
