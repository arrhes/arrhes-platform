import { computationsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute.js"
import { createRoute, redirect } from "@tanstack/react-router"


export const computationsRoute = createRoute({
    getParentRoute: () => computationsLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: params
        })
    },
})
