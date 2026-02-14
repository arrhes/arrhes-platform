import { createRoute } from "@tanstack/react-router"
import { AccountPage } from "../../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountPage.js"
import { accountLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute.js"


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
