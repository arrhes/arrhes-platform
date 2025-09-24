import { createRoute } from "@tanstack/react-router"
import { LedgerReportPage } from "features/organizations/$idOrganization/years/$idYear/reports/ledgerReport/ledgerReportPage"
import { reportsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute"


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
