import { createRoute, redirect } from "@tanstack/react-router"
import { computationsLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute.js"


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
