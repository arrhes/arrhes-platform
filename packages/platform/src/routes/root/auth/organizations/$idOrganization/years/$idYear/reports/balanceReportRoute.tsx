import { BalanceReportPage } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceReport/balanceReportPage.js"
import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
