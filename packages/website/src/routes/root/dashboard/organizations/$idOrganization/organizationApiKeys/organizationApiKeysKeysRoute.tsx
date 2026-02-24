import { createRoute } from "@tanstack/react-router"
import { OrganizationApiKeysKeysPage } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationApiKeys/organizationApiKeysKeysPage.js"
import { organizationApiKeysLayoutRoute } from "./organizationApiKeysLayoutRoute.js"

export const organizationApiKeysKeysRoute = createRoute({
    getParentRoute: () => organizationApiKeysLayoutRoute,
    path: "/clés",
    beforeLoad: () => ({
        title: "Clés",
    }),
    component: () => <OrganizationApiKeysKeysPage />,
})
