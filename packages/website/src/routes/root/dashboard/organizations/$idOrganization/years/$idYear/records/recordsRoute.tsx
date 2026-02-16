import { createRoute } from "@tanstack/react-router"
import { RecordsPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/records/recordsPage.js"
import { recordsLayoutRoute } from "./recordsLayoutRoute.js"

export const recordsRoute = createRoute({
    getParentRoute: () => recordsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <RecordsPage />,
})
