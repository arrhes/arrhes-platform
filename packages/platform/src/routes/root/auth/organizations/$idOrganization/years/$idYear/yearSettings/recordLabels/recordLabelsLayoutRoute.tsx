import { yearSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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
