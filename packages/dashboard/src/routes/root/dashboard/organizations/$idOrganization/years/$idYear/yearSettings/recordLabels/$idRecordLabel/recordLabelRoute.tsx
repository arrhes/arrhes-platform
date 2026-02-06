import { createRoute } from "@tanstack/react-router"
import { RecordLabelPage } from "../../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelPage.js"
import { recordLabelLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelLayoutRoute.js"


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
