import { createRoute } from "@tanstack/react-router"
import { Cgu } from "../../../../features/docs/root/cgu.tsx"
import { docsLayoutRoute } from "../docsLayoutRoute.tsx"


export const cguRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/cgu",
    beforeLoad: () => ({
        title: "CGU - Arrhes"
    }),
    component: () => (
        <Cgu />
    )
})
