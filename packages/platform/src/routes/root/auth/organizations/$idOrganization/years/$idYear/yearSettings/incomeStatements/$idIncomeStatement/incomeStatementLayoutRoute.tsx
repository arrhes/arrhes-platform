import { createRoute, Outlet } from "@tanstack/react-router"
import { incomeStatementsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute"


export const incomeStatementLayoutRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/$idIncomeStatement",
    beforeLoad: () => ({
        title: "Ligne de compte de résultat"
    }),
    component: () => (
        <Outlet />
    )
})
