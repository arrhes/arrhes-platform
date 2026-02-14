import { createRoute } from "@tanstack/react-router"
import { ComputationPage } from "../../../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationPage.js"
import { computationLayoutRoute } from "../../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.js"


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
