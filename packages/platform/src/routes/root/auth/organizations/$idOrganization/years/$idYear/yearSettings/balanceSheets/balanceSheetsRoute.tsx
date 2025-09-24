import { createRoute } from "@tanstack/react-router"
import { BalanceSheetsPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsPage"
import { balanceSheetsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute"


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
