import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationSettingsLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.js"


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
