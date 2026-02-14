import { createRoute } from "@tanstack/react-router"
import { OrganizationSettingsPage } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsPage.js"
import { organizationSettingsLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.js"


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

