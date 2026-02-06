import { createRoute } from "@tanstack/react-router"
import { OrganizationUsersPage } from "../../../../../../../features/dashboard/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersPage.js"
import { organizationUsersLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersLayoutRoute.js"


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

