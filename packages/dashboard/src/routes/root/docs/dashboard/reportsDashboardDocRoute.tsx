import { createRoute } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"
import { ReportsDashboardDocPage } from "../../../../features/docs/dashboard/reportsDashboardDocPage.tsx"


export const reportsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents de synthèse"
    }),
    component: () => (
        <ReportsDashboardDocPage />
    )
})
