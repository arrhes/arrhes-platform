import { createRoute } from "@tanstack/react-router"
import { YearSettingsLayout } from "features/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayout"
import { yearLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute"


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
