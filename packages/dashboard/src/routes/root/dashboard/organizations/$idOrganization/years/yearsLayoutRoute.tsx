import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationLayoutRoute.js"


export const yearsLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices"
    }),
    component: () => (
        <Outlet />
    )
})

