import { createRoute } from "@tanstack/react-router"
import { ApiEcritures } from "../../../../features/docs/api/ecritures.tsx"
import { apiLayoutRoute } from "./apiLayoutRoute.tsx"


export const apiEcrituresRoute = createRoute({
    getParentRoute: () => apiLayoutRoute,
    path: "/ecritures",
    beforeLoad: () => ({
        title: "API Écritures - Arrhes"
    }),
    component: () => (
        <ApiEcritures />
    )
})
