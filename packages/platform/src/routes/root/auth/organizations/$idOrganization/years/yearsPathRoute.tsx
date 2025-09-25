import { organizationPathRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationPathRoute.js"
import { createRoute } from "@tanstack/react-router"


export const yearsPathRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices"
    }),
})

