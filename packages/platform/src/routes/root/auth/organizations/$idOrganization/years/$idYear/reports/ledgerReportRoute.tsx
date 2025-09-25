import { LedgerReportPage } from "#/features/organizations/$idOrganization/years/$idYear/reports/ledgerReport/ledgerReportPage.js"
import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
