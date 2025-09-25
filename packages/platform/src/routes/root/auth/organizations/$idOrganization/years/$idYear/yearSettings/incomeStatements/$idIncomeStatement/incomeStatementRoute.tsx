import { IncomeStatementPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementPage.js"
import { incomeStatementLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const incomeStatementRoute = createRoute({
    getParentRoute: () => incomeStatementLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <IncomeStatementPage />
    )
})
