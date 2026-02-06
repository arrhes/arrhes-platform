import { createRoute, redirect } from "@tanstack/react-router"
import { reportsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"


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
