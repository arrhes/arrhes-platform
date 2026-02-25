import { createRoute } from "@tanstack/react-router"
import { YearLayout } from "../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearLayout.js"
import { prefetchYearData } from "../../../../../../../utilities/prefetchYearData.js"
import { yearPathRoute } from "./yearPathRoute.js"

export const yearLayoutRoute = createRoute({
    getParentRoute: () => yearPathRoute,
    id: "yearLayout",
    beforeLoad: ({ params }) => {
        prefetchYearData({
            idOrganization: params.idOrganization,
            idYear: params.idYear,
        })

        return {
            title: undefined,
        }
    },
    component: () => <YearLayout />,
})
