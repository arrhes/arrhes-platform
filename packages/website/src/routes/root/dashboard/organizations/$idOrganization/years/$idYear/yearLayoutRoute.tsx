import { createRoute } from "@tanstack/react-router"
import { YearLayout } from "../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearLayout.js"
import { yearPathRoute } from "./yearPathRoute.js"


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
