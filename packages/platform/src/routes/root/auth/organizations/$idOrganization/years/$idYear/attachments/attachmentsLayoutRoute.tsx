import { yearLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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
