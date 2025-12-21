import { ReportsLayout } from "#/features/organizations/$idOrganization/years/$idYear/reports/reportsLayout.js"
import { yearLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const reportsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents comptables"
    }),
    component: () => (
        <ReportsLayout />
    )
})
