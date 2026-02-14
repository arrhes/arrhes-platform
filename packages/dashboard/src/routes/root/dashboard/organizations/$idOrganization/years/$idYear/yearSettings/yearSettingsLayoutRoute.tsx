import { createRoute } from "@tanstack/react-router"
import { YearSettingsLayout } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayout.js"
import { yearLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"


export const yearSettingsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres"
    }),
    component: () => (
        <YearSettingsLayout />
    )
})
