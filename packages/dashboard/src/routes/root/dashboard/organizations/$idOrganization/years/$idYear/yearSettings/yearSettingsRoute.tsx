import { createRoute } from "@tanstack/react-router"
import { YearSettingsPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsPage.js"
import { yearSettingsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"


export const yearSettingsRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <YearSettingsPage />
    )
})
