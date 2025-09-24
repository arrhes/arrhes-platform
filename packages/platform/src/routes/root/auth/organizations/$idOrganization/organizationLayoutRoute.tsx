import { createRoute } from "@tanstack/react-router"
import { OrganizationLayout } from "features/organizations/$idOrganization/organizationLayout"
import { organizationPathRoute } from "routes/root/auth/organizations/$idOrganization/organizationPathRoute"


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
