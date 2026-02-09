import { createRoute } from "@tanstack/react-router"
import { ApiComptes } from "../../../../features/docs/api/comptes.tsx"
import { apiLayoutRoute } from "./apiLayoutRoute.tsx"


export const apiComptesRoute = createRoute({
    getParentRoute: () => apiLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "API Comptes - Arrhes"
    }),
    component: () => (
        <ApiComptes />
    )
})
