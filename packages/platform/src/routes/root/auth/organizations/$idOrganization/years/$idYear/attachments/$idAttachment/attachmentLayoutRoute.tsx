import { createRoute, Outlet } from "@tanstack/react-router"
import { attachmentsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute"


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
