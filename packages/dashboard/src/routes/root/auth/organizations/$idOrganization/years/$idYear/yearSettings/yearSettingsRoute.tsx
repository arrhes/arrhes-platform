import { YearSettingsPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsPage.js"
import { yearSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
