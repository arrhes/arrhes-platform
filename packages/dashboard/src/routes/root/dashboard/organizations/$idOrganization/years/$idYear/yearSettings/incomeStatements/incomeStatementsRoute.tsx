import { createRoute } from "@tanstack/react-router"
import { IncomeStatementsPage } from "../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsPage.js"
import { incomeStatementsLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.js"


export const incomeStatementsRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <IncomeStatementsPage />
    )
})
