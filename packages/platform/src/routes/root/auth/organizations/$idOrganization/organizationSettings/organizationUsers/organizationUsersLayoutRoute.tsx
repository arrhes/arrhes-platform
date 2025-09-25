import { organizationSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const organizationUsersLayoutRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres"
    }),
    component: () => (
        <Outlet />
    )
})
