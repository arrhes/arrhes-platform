import { yearSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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
