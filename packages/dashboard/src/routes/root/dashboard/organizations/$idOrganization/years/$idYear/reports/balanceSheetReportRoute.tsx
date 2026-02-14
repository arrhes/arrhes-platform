import { createRoute } from "@tanstack/react-router"
import { BalanceSheetReportPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetReportPage.js"
import { reportsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"


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
