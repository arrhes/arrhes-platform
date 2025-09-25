import { ComputationPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationPage.js"
import { computationLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const computationRoute = createRoute({
    getParentRoute: () => computationLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <ComputationPage />
    )
})
