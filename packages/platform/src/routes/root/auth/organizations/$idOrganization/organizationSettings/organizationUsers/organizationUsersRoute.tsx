import { createRoute } from "@tanstack/react-router"
import { OrganizationUsersPage } from "features/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersPage"
import { organizationUsersLayoutRoute } from "routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersLayoutRoute"


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

