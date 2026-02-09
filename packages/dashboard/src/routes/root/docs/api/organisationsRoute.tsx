import { createRoute } from "@tanstack/react-router"
import { ApiOrganisations } from "../../../../features/docs/api/organisations.tsx"
import { apiLayoutRoute } from "./apiLayoutRoute.tsx"


export const apiOrganisationsRoute = createRoute({
    getParentRoute: () => apiLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "API Organisations - Arrhes"
    }),
    component: () => (
        <ApiOrganisations />
    )
})
