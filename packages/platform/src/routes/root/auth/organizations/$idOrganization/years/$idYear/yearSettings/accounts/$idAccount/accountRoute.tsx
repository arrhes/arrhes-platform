import { createRoute } from "@tanstack/react-router"
import { AccountPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountPage"
import { accountLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute"


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
