import { createRoute } from "@tanstack/react-router"
import { AccountsPage } from "../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsPage.js"
import { accountsLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute.js"


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
