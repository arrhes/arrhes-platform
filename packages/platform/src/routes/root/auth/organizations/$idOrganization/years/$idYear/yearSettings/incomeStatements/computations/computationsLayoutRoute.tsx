import { createRoute, Outlet } from "@tanstack/react-router"
import { incomeStatementsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute"


export const computationsLayoutRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/calculs",
    beforeLoad: () => ({
        title: "Calculs"
    }),
    component: () => (
        <Outlet />
    )
})
