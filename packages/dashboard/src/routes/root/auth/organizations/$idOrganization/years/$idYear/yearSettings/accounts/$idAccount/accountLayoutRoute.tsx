import { accountsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const accountLayoutRoute = createRoute({
    getParentRoute: () => accountsLayoutRoute,
    path: "/$idAccount",
    beforeLoad: () => ({
        title: "Compte"
    }),
    component: () => (
        <Outlet />
    )
})
