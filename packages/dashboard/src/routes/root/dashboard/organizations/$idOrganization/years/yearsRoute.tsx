import { createRoute } from "@tanstack/react-router"
import { YearsPage } from "../../../../../../features/dashboard/organizations/$idOrganization/years/yearsPage.js"
import { yearsLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/yearsLayoutRoute.js"


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

