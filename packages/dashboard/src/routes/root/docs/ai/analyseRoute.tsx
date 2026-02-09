import { createRoute } from "@tanstack/react-router"
import { AiAnalyse } from "../../../../features/docs/ai/analyse.tsx"
import { aiLayoutRoute } from "./aiLayoutRoute.tsx"


export const aiAnalyseRoute = createRoute({
    getParentRoute: () => aiLayoutRoute,
    path: "/analyse",
    beforeLoad: () => ({
        title: "Analyse IA - Arrhes"
    }),
    component: () => (
        <AiAnalyse />
    )
})
