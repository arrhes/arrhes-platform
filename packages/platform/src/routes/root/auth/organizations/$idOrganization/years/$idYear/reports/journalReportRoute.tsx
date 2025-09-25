import { JournalReportPage } from "#/features/organizations/$idOrganization/years/$idYear/reports/journalReport/journalReportPage.js"
import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const journalReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/livre-journal",
    beforeLoad: () => ({
        title: "Livre-journal"
    }),
    component: () => (
        <JournalReportPage />
    )
})
