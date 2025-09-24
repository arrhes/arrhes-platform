import { createRoute } from "@tanstack/react-router"
import { organizationsLayoutRoute } from "routes/root/auth/organizations/organizationsLayoutRoute"


export const organizationPathRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/$idOrganization",
    beforeLoad: () => ({
        title: "Organisation"
    }),
})
