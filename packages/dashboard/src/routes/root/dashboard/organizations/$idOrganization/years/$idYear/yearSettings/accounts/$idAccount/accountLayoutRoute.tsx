import { createRoute, Outlet } from "@tanstack/react-router"
import { accountsLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute.js"


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
