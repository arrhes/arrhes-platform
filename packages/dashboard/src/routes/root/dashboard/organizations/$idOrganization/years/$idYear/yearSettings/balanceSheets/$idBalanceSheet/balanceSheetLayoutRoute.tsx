import { createRoute, Outlet } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.js"


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
