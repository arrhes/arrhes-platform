import { createRoute } from "@tanstack/react-router"
import { ReportsLayout } from "features/organizations/$idOrganization/years/$idYear/reports/reportsLayout"
import { yearLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute"


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
