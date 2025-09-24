import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute"


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
