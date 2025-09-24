import { createRoute } from "@tanstack/react-router"
import { IncomeStatementsPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsPage"
import { incomeStatementsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute"


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
