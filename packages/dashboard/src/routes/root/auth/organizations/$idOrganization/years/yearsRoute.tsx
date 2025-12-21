import { YearsPage } from "#/features/organizations/$idOrganization/years/yearsPage.js"
import { yearsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/yearsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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

