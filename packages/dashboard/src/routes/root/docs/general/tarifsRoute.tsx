import { createRoute } from "@tanstack/react-router"
import { Tarifs } from "../../../../features/docs/root/pricing/tarifs.tsx"
import { docsLayoutRoute } from "../docsLayoutRoute.tsx"


export const tarifsRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/tarifs",
    beforeLoad: () => ({
        title: "Tarifs - Arrhes"
    }),
    component: () => (
        <Tarifs />
    )
})
