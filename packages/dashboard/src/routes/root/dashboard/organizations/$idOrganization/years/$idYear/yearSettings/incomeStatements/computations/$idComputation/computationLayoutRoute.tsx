import { createRoute, Outlet } from "@tanstack/react-router"
import { computationsLayoutRoute } from "../../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute.js"


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
