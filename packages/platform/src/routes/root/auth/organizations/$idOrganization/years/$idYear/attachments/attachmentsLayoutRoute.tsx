import { createRoute, Outlet } from "@tanstack/react-router"
import { yearLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute"


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
