import { createRoute } from "@tanstack/react-router"
import { BalanceSheetsPage } from "../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsPage.js"
import { balanceSheetsLayoutRoute } from "./balanceSheetsLayoutRoute.js"


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
