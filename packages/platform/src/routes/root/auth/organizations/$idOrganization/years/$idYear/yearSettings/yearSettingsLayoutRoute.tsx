import { YearSettingsLayout } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayout.js"
import { yearLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
