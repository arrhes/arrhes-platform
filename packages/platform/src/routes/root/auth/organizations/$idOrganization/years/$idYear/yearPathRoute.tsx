import { yearsPathRoute } from "#/routes/root/auth/organizations/$idOrganization/years/yearsPathRoute.js"
import { createRoute } from "@tanstack/react-router"


export const yearPathRoute = createRoute({
    getParentRoute: () => yearsPathRoute,
    path: "/$idYear",
    beforeLoad: () => ({
        title: "Exercice"
    }),
})
