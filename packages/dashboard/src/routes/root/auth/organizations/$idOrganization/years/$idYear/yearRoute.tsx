import { yearLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"
import { createRoute, redirect } from "@tanstack/react-router"


export const yearRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/organisations/$idOrganization/exercices/$idYear/écritures",
            params: params
        })
    },
})

