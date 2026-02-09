import { createRoute } from "@tanstack/react-router"
import { Support } from "../../../../features/docs/root/support.tsx"
import { docsLayoutRoute } from "../docsLayoutRoute.tsx"


export const supportRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support - Arrhes"
    }),
    component: () => (
        <Support />
    )
})
