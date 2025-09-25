import { computationsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const computationLayoutRoute = createRoute({
    getParentRoute: () => computationsLayoutRoute,
    path: "/$idComputation",
    beforeLoad: () => ({
        title: "Calcul"
    }),
    component: () => (
        <Outlet />
    )
})
