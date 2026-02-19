import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationSettingsLayoutRoute } from "../organizationSettingsLayoutRoute.js"

export const organizationSubscriptionLayoutRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/abonnement",
    beforeLoad: () => ({
        title: "Abonnement",
    }),
    component: () => <Outlet />,
})
