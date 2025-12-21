import { OrganizationsPage } from "#/features/organizations/organizationsPage.js"
import { organizationsLayoutRoute } from "#/routes/root/auth/organizations/organizationsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
