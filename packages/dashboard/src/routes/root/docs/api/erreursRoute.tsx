import { createRoute } from "@tanstack/react-router"
import { ApiErreurs } from "../../../../features/docs/api/erreurs.tsx"
import { apiLayoutRoute } from "./apiLayoutRoute.tsx"


export const apiErreursRoute = createRoute({
    getParentRoute: () => apiLayoutRoute,
    path: "/erreurs",
    beforeLoad: () => ({
        title: "Gestion des erreurs API - Arrhes"
    }),
    component: () => (
        <ApiErreurs />
    )
})
