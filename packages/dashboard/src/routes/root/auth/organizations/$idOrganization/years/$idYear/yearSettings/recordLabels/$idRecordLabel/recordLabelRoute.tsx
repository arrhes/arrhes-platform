import { RecordLabelPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelPage.js"
import { recordLabelLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const recordLabelRoute = createRoute({
    getParentRoute: () => recordLabelLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <RecordLabelPage />
    )
})
