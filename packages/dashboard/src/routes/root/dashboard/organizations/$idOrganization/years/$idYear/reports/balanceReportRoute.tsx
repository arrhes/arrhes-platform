import { createRoute } from "@tanstack/react-router"
import { BalanceReportPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceReport/balanceReportPage.js"
import { reportsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"


export const balanceReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/balance",
    beforeLoad: () => ({
        title: "Balance"
    }),
    component: () => (
        <BalanceReportPage />
    )
})
