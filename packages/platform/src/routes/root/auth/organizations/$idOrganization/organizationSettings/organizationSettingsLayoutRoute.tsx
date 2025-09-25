import { OrganizationSettingsLayout } from "#/features/organizations/$idOrganization/organizationSettings/organizationSettingsLayout.js"
import { organizationLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const organizationSettingsLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres"
    }),
    component: () => (
        <OrganizationSettingsLayout />
    )
})
