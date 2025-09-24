import { createRoute } from "@tanstack/react-router"
import { YearSettingsPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsPage"
import { yearSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute"


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
