import { createRoute } from "@tanstack/react-router"
import { organizationPathRoute } from "routes/root/auth/organizations/$idOrganization/organizationPathRoute"


export const yearsPathRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices"
    }),
})

