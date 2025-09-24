import { createRoute, Outlet } from "@tanstack/react-router"
import { recordsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsLayoutRoute"


export const recordLayoutRoute = createRoute({
    getParentRoute: () => recordsLayoutRoute,
    path: "/$idRecord",
    beforeLoad: () => ({
        title: "Écriture"
    }),
    component: () => (
        <Outlet />
    )
})
