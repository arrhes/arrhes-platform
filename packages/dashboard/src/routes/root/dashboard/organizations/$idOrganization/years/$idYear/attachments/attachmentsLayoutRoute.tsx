import { createRoute, Outlet } from "@tanstack/react-router"
import { yearLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"


export const attachmentsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/fichiers",
    beforeLoad: () => ({
        title: "Stockage de fichiers"
    }),
    component: () => (
        <Outlet />
    )
})
