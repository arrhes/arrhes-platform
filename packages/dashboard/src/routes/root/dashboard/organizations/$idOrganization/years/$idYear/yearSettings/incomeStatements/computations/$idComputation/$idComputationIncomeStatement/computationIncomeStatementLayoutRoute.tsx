import { createRoute, Outlet } from "@tanstack/react-router"
import { computationLayoutRoute } from "../../../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.js"


export const computationIncomeStatementLayoutRoute = createRoute({
    getParentRoute: () => computationLayoutRoute,
    path: "/$idComputationIncomeStatement",
    beforeLoad: () => ({
        title: "Terme du calcul"
    }),
    component: () => (
        <Outlet />
    )
})
