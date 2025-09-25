import { attachmentsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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
