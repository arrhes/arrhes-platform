import { createRoute } from "@tanstack/react-router"
import { YearLayout } from "features/organizations/$idOrganization/years/$idYear/yearLayout"
import { yearPathRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearPathRoute"


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
