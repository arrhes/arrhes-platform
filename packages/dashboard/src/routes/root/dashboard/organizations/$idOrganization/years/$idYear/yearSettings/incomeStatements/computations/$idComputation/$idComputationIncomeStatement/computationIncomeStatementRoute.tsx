import { createRoute } from "@tanstack/react-router"
import { ComputationIncomeStatementPage } from "../../../../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/computationIncomeStatementPage.js"
import { computationIncomeStatementLayoutRoute } from "../../../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute.js"


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
