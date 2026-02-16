import { createRoute } from "@tanstack/react-router"
import { JournalReportPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/reports/journalReport/journalReportPage.js"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const journalReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/livre-journal",
    beforeLoad: () => ({
        title: "Livre-journal",
    }),
    component: () => <JournalReportPage />,
})
