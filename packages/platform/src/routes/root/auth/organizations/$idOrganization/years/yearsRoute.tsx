import { createRoute } from "@tanstack/react-router"
import { YearsPage } from "features/organizations/$idOrganization/years/yearsPage"
import { yearsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/yearsLayoutRoute"


export const yearsRoute = createRoute({
    getParentRoute: () => yearsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Exercices fiscaux"
    }),
    component: () => (
        <YearsPage />
    )
})

