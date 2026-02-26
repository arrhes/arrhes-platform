import { createRoute } from "@tanstack/react-router"
import { AccountingApiDocPage } from "../../../../features/docs/api/accountingApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const accountingApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/comptabilité",
    beforeLoad: () => ({
        title: "Comptabilité",
    }),
    component: () => <AccountingApiDocPage />,
})
