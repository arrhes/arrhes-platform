import { createRoute } from "@tanstack/react-router"
import { OrganizationSettingsLayout } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsLayout.js"
import { organizationLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationLayoutRoute.js"


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
