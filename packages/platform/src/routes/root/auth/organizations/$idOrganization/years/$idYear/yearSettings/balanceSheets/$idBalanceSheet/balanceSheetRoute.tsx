import { BalanceSheetPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetPage.js"
import { balanceSheetLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
