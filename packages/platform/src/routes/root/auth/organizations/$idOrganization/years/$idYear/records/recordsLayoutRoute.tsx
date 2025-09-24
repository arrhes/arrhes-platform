import { createRoute, Outlet } from "@tanstack/react-router"
import { yearLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute"


export const recordsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures"
    }),
    component: () => (
        <Outlet />
    )
})
