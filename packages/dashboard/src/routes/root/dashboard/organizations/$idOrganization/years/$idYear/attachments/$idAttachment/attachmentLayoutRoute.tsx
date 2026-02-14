import { createRoute, Outlet } from "@tanstack/react-router"
import { attachmentsLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js"


export const attachmentLayoutRoute = createRoute({
    getParentRoute: () => attachmentsLayoutRoute,
    path: "/$idAttachment",
    beforeLoad: () => ({
        title: "Pièce justificative"
    }),
    component: () => (
        <Outlet />
    ),
})
