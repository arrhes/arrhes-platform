import { organizationLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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

