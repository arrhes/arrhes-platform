import { createRoute } from "@tanstack/react-router"
import { IncomeStatementPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementPage"
import { incomeStatementLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute"


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
