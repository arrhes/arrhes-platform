import { createRoute } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"
import { RecordsDashboardDocPage } from "../../../../features/docs/dashboard/recordsDashboardDocPage.js"


export const recordsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures"
    }),
    component: () => (
        <RecordsDashboardDocPage />
    )
})
