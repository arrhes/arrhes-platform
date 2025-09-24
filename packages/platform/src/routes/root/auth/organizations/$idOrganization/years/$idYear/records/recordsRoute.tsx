import { createRoute } from "@tanstack/react-router"
import { RecordsPage } from "features/organizations/$idOrganization/years/$idYear/records/recordsPage"
import { recordsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsLayoutRoute"


export const recordsRoute = createRoute({
    getParentRoute: () => recordsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <RecordsPage />
    )
})
