import { createRoute, Outlet } from "@tanstack/react-router"
import { recordsLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/recordsLayoutRoute.js"


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
