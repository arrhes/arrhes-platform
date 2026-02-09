import { createRoute } from "@tanstack/react-router"
import { GuideDemarrage } from "../../../../features/docs/dashboard/demarrage.tsx"
import { guideLayoutRoute } from "./guideLayoutRoute.tsx"


export const guideDemarrageRoute = createRoute({
    getParentRoute: () => guideLayoutRoute,
    path: "/demarrage",
    beforeLoad: () => ({
        title: "Demarrer avec Arrhes"
    }),
    component: () => (
        <GuideDemarrage />
    )
})
