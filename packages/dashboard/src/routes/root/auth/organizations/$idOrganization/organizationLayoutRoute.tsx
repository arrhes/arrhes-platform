import { OrganizationLayout } from "#/features/organizations/$idOrganization/organizationLayout.js"
import { organizationPathRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationPathRoute.js"
import { createRoute } from "@tanstack/react-router"


export const organizationLayoutRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    id: "organizationLayout",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <OrganizationLayout />
    )
})
