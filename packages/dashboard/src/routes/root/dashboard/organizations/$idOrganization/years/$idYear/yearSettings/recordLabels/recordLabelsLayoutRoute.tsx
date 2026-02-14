import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"


export const recordLabelsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/catégories",
    beforeLoad: () => ({
        title: "Catégories"
    }),
    component: () => (
        <Outlet />
    )
})
