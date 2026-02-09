import { createRoute } from "@tanstack/react-router"
import { ApiAuthentification } from "../../../../features/docs/api/authentification.tsx"
import { apiLayoutRoute } from "./apiLayoutRoute.tsx"


export const apiAuthentificationRoute = createRoute({
    getParentRoute: () => apiLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification API - Arrhes"
    }),
    component: () => (
        <ApiAuthentification />
    )
})
