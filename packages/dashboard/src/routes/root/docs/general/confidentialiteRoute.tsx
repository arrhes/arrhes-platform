import { createRoute } from "@tanstack/react-router"
import { Confidentialite } from "../../../../features/docs/root/confidentialite.tsx"
import { docsLayoutRoute } from "../docsLayoutRoute.tsx"


export const confidentialiteRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/confidentialite",
    beforeLoad: () => ({
        title: "Politique de confidentialité - Arrhes"
    }),
    component: () => (
        <Confidentialite />
    )
})
