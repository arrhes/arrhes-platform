import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute"


export const balanceSheetsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan"
    }),
    component: () => (
        <Outlet />
    )
})
