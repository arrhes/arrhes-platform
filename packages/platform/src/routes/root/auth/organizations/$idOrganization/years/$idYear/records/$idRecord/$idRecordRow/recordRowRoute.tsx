import { createRoute } from "@tanstack/react-router"
import { RecordRowPage } from "features/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowPage"
import { recordRowLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowLayoutRoute"


export const recordRowRoute = createRoute({
    getParentRoute: () => recordRowLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <RecordRowPage />
    )
})
