import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../organizationLayoutRoute.js"

export const organizationSettingsLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres",
    }),
    component: () => <Outlet />,
})
