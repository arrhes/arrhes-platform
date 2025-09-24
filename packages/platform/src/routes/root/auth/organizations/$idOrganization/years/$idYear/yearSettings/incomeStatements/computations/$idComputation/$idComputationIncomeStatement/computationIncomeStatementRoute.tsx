import { createRoute } from "@tanstack/react-router"
import { ComputationIncomeStatementPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/computationIncomeStatementPage"
import { computationIncomeStatementLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute"


export const computationIncomeStatementRoute = createRoute({
    getParentRoute: () => computationIncomeStatementLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <ComputationIncomeStatementPage />
    )
})
