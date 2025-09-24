import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute"


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
