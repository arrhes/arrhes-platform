import { yearSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const journalsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/journaux",
    beforeLoad: () => ({
        title: "Journaux"
    }),
    component: () => (
        <Outlet />
    )
})
