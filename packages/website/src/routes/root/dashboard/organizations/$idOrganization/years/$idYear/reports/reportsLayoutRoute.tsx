import { createRoute } from "@tanstack/react-router"
import { ReportsLayout } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayout.js"
import { yearLayoutRoute } from "../yearLayoutRoute.js"


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
