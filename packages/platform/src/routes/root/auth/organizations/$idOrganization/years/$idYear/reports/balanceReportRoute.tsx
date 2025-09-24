import { createRoute } from "@tanstack/react-router"
import { BalanceReportPage } from "features/organizations/$idOrganization/years/$idYear/reports/balanceReport/balanceReportPage"
import { reportsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute"


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
