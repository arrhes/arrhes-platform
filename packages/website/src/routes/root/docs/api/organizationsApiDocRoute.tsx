import { createRoute } from "@tanstack/react-router"
import { OrganizationsApiDocPage } from "../../../../features/docs/api/organizationsApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const organizationsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
    }),
    component: () => <OrganizationsApiDocPage />,
})
