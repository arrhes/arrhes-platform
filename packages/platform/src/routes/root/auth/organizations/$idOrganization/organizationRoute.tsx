import { createRoute, redirect } from "@tanstack/react-router"
import { organizationLayoutRoute } from "routes/root/auth/organizations/$idOrganization/organizationLayoutRoute"


export const organizationRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/organisations/$idOrganization/exercices",
            params: params
        })
    },
})

