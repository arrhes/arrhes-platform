import { createRoute } from "@tanstack/react-router"
import { OrganizationUsersPage } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationUsers/organizationUsersPage.js"
import { organizationUsersLayoutRoute } from "./organizationUsersLayoutRoute.js"

export const organizationUsersRoute = createRoute({
    getParentRoute: () => organizationUsersLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationUsersPage />,
})
