import { createRoute } from "@tanstack/react-router"
import { OrganizationApiKeysGeneralPage } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationApiKeys/organizationApiKeysGeneralPage.js"
import { organizationApiKeysLayoutRoute } from "./organizationApiKeysLayoutRoute.js"

export const organizationApiKeysRoute = createRoute({
    getParentRoute: () => organizationApiKeysLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationApiKeysGeneralPage />,
})
