import { createRoute } from "@tanstack/react-router"
import { AttachmentsPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/attachments/attachmentsPage.js"
import { attachmentsLayoutRoute } from "./attachmentsLayoutRoute.js"


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
