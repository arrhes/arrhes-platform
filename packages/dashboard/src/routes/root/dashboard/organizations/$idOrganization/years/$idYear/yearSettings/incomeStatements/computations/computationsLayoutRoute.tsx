import { createRoute, Outlet } from "@tanstack/react-router"
import { incomeStatementsLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.js"


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
