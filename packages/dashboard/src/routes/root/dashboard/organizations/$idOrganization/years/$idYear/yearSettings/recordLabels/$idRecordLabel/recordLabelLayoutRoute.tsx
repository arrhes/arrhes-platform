import { createRoute, Outlet } from "@tanstack/react-router"
import { recordLabelsLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsLayoutRoute.js"


export const recordLabelLayoutRoute = createRoute({
    getParentRoute: () => recordLabelsLayoutRoute,
    path: "/$idRecordLabel",
    beforeLoad: () => ({
        title: "Catégorie"
    }),
    component: () => (
        <Outlet />
    )
})
