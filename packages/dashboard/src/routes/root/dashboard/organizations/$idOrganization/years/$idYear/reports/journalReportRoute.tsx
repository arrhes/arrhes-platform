import { createRoute } from "@tanstack/react-router"
import { JournalReportPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/reports/journalReport/journalReportPage.js"
import { reportsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"


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
