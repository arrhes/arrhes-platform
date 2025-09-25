import { incomeStatementsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


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
