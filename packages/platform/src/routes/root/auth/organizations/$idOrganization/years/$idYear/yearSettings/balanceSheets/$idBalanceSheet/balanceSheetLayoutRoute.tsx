import { createRoute, Outlet } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute"


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
