import { OrganizationSettingsPage } from "#/features/organizations/$idOrganization/organizationSettings/organizationSettingsPage.js"
import { organizationSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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

