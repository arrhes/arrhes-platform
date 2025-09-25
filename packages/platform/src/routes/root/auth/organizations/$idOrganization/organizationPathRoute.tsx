import { organizationsLayoutRoute } from "#/routes/root/auth/organizations/organizationsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const organizationPathRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/$idOrganization",
    beforeLoad: () => ({
        title: "Organisation"
    }),
})
