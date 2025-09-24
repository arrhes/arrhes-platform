import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute"


export const accountsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Plan des comptes"
    }),
    component: () => (
        <Outlet />
    )
})
