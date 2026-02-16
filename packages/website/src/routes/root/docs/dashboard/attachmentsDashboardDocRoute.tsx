import { createRoute } from "@tanstack/react-router"
import { AttachmentsDashboardDocPage } from "../../../../features/docs/dashboard/attachmentsDashboardDocPage.js"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const attachmentsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
    }),
    component: () => <AttachmentsDashboardDocPage />,
})
