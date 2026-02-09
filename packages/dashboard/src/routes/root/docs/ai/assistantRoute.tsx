import { createRoute } from "@tanstack/react-router"
import { AiAssistant } from "../../../../features/docs/ai/assistant.tsx"
import { aiLayoutRoute } from "./aiLayoutRoute.tsx"


export const aiAssistantRoute = createRoute({
    getParentRoute: () => aiLayoutRoute,
    path: "/assistant",
    beforeLoad: () => ({
        title: "Assistant IA - Arrhes"
    }),
    component: () => (
        <AiAssistant />
    )
})
