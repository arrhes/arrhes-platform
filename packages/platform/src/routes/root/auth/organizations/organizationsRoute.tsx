import { createRoute } from "@tanstack/react-router"
import { OrganizationsPage } from "features/organizations/organizationsPage"
import { organizationsLayoutRoute } from "routes/root/auth/organizations/organizationsLayoutRoute"


export const organizationsRoute = createRoute({
    getParentRoute: () => organizationsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Organisations"
    }),
    component: () => (
        <OrganizationsPage />
    )
})
