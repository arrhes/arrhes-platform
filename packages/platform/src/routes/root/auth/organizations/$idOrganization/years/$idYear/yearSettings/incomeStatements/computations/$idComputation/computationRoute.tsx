import { createRoute } from "@tanstack/react-router"
import { ComputationPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationPage"
import { computationLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute"


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
