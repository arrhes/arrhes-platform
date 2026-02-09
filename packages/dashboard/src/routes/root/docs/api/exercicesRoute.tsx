import { createRoute } from "@tanstack/react-router"
import { ApiExercices } from "../../../../features/docs/api/exercices.tsx"
import { apiLayoutRoute } from "./apiLayoutRoute.tsx"


export const apiExercicesRoute = createRoute({
    getParentRoute: () => apiLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "API Exercices - Arrhes"
    }),
    component: () => (
        <ApiExercices />
    )
})
