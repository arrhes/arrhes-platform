import { createRoute } from "@tanstack/react-router"
import { BalanceSheetReportPage } from "features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetReportPage"
import { reportsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute"


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
