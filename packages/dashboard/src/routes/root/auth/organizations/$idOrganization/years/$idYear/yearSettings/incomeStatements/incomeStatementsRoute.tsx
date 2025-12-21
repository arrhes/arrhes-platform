import { IncomeStatementsPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsPage.js"
import { incomeStatementsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
