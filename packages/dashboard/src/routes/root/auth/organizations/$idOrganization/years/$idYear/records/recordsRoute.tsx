import { RecordsPage } from "#/features/organizations/$idOrganization/years/$idYear/records/recordsPage.js"
import { recordsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
