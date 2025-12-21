import { YearLayout } from "#/features/organizations/$idOrganization/years/$idYear/yearLayout.js"
import { yearPathRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearPathRoute.js"
import { createRoute } from "@tanstack/react-router"


export const yearLayoutRoute = createRoute({
    getParentRoute: () => yearPathRoute,
    id: "yearLayout",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <YearLayout />
    ),
})
