import { createRoute } from "@tanstack/react-router"
import { RecordLabelsPage } from "../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsPage.js"
import { recordLabelsLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsLayoutRoute.js"


export const recordLabelsRoute = createRoute({
    getParentRoute: () => recordLabelsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <RecordLabelsPage />
    )
})
