import { createRoute, Outlet } from "@tanstack/react-router"
import { attachmentsLayoutRoute } from "../attachmentsLayoutRoute.js"


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
