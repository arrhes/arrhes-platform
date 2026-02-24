import { createRoute } from "@tanstack/react-router"
import { OrganizationApiKeysLayout } from "../../../../../../features/dashboard/organizations/$idOrganization/organizationApiKeys/organizationApiKeysLayout.js"
import { organizationLayoutRoute } from "../organizationLayoutRoute.tsx"

export const organizationApiKeysLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/clés-api",
    beforeLoad: () => ({
        title: "Clés API",
    }),
    component: () => <OrganizationApiKeysLayout />,
})
