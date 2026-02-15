import { createRoute } from "@tanstack/react-router"
import { organizationUsersLayoutRoute } from "./organizationUsersLayoutRoute.js"
import { OrganizationUsersPage } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationUsers/organizationUsersPage.js"


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

