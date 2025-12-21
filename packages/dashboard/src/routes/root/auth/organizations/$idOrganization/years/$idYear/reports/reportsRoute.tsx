import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { createRoute, redirect } from "@tanstack/react-router"


export const reportsRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/",
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/organisations/$idOrganization/exercices/$idYear/documents/livre-journal",
            params: params
        })
    },
})
