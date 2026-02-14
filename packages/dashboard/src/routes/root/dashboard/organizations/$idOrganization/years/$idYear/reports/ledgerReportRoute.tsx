import { createRoute } from "@tanstack/react-router"
import { LedgerReportPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/reports/ledgerReport/ledgerReportPage.js"
import { reportsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"


export const ledgerReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/grand-livre",
    beforeLoad: () => ({
        title: "Grand livre"
    }),
    component: () => (
        <LedgerReportPage />
    )
})
