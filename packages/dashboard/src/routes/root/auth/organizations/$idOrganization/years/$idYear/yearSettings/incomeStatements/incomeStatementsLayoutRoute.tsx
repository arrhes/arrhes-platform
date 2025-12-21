import { yearSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const incomeStatementsLayoutRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat"
    }),
    component: () => (
        <Outlet />
    )
})
