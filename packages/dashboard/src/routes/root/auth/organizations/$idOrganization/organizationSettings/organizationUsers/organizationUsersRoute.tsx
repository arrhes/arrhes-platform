import { OrganizationUsersPage } from "#/features/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersPage.js"
import { organizationUsersLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const organizationUsersRoute = createRoute({
    getParentRoute: () => organizationUsersLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <OrganizationUsersPage />
    )
})

