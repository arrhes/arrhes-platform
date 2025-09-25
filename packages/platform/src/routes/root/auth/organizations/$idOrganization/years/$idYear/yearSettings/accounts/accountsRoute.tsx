import { AccountsPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsPage.js"
import { accountsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
