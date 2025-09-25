import { RecordRowPage } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowPage.js"
import { recordRowLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
