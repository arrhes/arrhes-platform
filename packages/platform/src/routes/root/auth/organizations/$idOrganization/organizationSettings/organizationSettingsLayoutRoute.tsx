import { createRoute } from "@tanstack/react-router"
import { OrganizationSettingsLayout } from "features/organizations/$idOrganization/organizationSettings/organizationSettingsLayout"
import { organizationLayoutRoute } from "routes/root/auth/organizations/$idOrganization/organizationLayoutRoute"


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
