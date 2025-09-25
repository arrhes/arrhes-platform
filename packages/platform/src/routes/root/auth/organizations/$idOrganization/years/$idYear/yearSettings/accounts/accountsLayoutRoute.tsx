import { yearSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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
