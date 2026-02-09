import { createRoute } from "@tanstack/react-router"
import { MentionsLegales } from "../../../../features/docs/root/mentionsLegales.tsx"
import { docsLayoutRoute } from "../docsLayoutRoute.tsx"


export const mentionsLegalesRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/mentions-legales",
    beforeLoad: () => ({
        title: "Mentions légales - Arrhes"
    }),
    component: () => (
        <MentionsLegales />
    )
})
