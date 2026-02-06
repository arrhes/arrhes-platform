import { createRoute } from "@tanstack/react-router"
import { GuideDemarrage } from "../../../../features/docs/guide/demarrage.tsx"
import { guideLayoutRoute } from "./guideLayoutRoute.tsx"


export const guideDemarrageRoute = createRoute({
    getParentRoute: () => guideLayoutRoute,
    path: "/démarrage",
    beforeLoad: () => ({
        title: "Demarrer avec Arrhes"
    }),
    component: () => (
        <GuideDemarrage />
    )
})
