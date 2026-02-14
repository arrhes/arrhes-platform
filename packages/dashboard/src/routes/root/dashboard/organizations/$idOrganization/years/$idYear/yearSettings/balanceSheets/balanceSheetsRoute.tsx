import { createRoute } from "@tanstack/react-router"
import { BalanceSheetsPage } from "../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsPage.js"
import { balanceSheetsLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.js"


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
