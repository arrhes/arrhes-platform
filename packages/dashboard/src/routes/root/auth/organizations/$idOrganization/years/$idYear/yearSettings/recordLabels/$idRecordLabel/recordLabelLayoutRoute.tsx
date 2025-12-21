import { recordLabelsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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
