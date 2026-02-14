import { createRoute } from "@tanstack/react-router"
import { RecordRowPage } from "../../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowPage.js"
import { recordRowLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowLayoutRoute.js"


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
