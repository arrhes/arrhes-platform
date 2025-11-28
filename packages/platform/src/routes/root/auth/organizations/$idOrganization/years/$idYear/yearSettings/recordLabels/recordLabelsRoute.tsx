import { RecordLabelsPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsPage.js"
import { recordLabelsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
