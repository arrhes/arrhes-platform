import { BalanceSheetsPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsPage.js"
import { balanceSheetsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const balanceSheetsRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <BalanceSheetsPage />
    )
})
