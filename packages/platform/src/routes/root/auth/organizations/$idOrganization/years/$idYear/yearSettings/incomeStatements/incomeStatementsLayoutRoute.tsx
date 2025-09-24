import { createRoute, Outlet } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute"


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
