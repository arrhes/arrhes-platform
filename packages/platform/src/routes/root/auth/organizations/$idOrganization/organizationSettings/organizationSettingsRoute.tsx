import { createRoute } from "@tanstack/react-router"
import { OrganizationSettingsPage } from "features/organizations/$idOrganization/organizationSettings/organizationSettingsPage"
import { organizationSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute"


export const organizationSettingsRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <OrganizationSettingsPage />
    )
})

