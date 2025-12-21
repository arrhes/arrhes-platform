import { balanceSheetsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const balanceSheetLayoutRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/$idBalanceSheet",
    beforeLoad: () => ({
        title: "Ligne de bilan"
    }),
    component: () => (
        <Outlet />
    )
})
