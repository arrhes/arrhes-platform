import { createRoute } from "@tanstack/react-router"
import { organizationsLayoutRoute } from "../organizationsLayoutRoute.tsx"

export const organizationPathRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/$idOrganization",
    beforeLoad: () => ({
        title: "Organisation",
    }),
})
