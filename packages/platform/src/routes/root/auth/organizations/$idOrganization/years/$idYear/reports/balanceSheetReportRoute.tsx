import { BalanceSheetReportPage } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetReportPage.js"
import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const balanceSheetReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan"
    }),
    component: () => (
        <BalanceSheetReportPage />
    )
})
