import { RecordPage } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/recordPage.js"
import { recordLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const recordRoute = createRoute({
    getParentRoute: () => recordLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <RecordPage />
    )
})
