import { createRoute } from "@tanstack/react-router"
import { RecordPage } from "../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/recordPage.js"
import { recordLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/recordLayoutRoute.js"


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
