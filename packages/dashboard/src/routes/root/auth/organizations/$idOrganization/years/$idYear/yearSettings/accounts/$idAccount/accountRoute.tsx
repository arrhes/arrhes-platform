import { AccountPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountPage.js"
import { accountLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const accountRoute = createRoute({
    getParentRoute: () => accountLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <AccountPage />
    )
})
