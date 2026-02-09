import { createRoute } from "@tanstack/react-router"
import { AiIndex } from "../../../../features/docs/aiIndex.js"
import { aiLayoutRoute } from "./aiLayoutRoute.js"


export const aiIndexRoute = createRoute({
    getParentRoute: () => aiLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "IA - Documentation - Arrhes"
    }),
    component: () => (
        <AiIndex />
    )
})
