import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationLayoutRoute } from "routes/root/auth/organizations/$idOrganization/organizationLayoutRoute"


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

