import { createRoute, Outlet } from "@tanstack/react-router"
import { computationLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute"


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
