import { createRoute } from "@tanstack/react-router"
import { BalanceSheetPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetPage"
import { balanceSheetLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute"


export const balanceSheetRoute = createRoute({
    getParentRoute: () => balanceSheetLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <BalanceSheetPage />
    )
})
