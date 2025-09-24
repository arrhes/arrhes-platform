import { createRoute } from "@tanstack/react-router"
import { yearsPathRoute } from "routes/root/auth/organizations/$idOrganization/years/yearsPathRoute"


export const yearPathRoute = createRoute({
    getParentRoute: () => yearsPathRoute,
    path: "/$idYear",
    beforeLoad: () => ({
        title: "Exercice"
    }),
})
