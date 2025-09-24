import { createRoute } from "@tanstack/react-router"
import { AccountsPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsPage"
import { accountsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute"


export const accountsRoute = createRoute({
    getParentRoute: () => accountsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <AccountsPage />
    )
})
