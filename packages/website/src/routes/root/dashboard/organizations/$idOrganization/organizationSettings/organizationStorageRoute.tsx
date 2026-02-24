import { createRoute } from "@tanstack/react-router"
import { OrganizationStoragePage } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationSettings/organizationStoragePage.js"
import { organizationSettingsLayoutRoute } from "./organizationSettingsLayoutRoute.js"

export const organizationStorageRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
    }),
    component: () => <OrganizationStoragePage />,
})
