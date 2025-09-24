import { createRoute } from "@tanstack/react-router"
import { RecordPage } from "features/organizations/$idOrganization/years/$idYear/records/$idRecord/recordPage"
import { recordLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordLayoutRoute"


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
