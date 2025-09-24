import { createRoute, redirect } from "@tanstack/react-router"
import { reportsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute"


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
