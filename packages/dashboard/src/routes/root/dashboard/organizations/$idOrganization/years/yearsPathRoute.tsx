import { createRoute } from "@tanstack/react-router"
import { organizationPathRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationPathRoute.js"


export const yearsPathRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices"
    }),
})

