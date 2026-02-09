import { createRoute } from "@tanstack/react-router"
import { GuideRapports } from "../../../../features/docs/dashboard/rapports.tsx"
import { guideLayoutRoute } from "./guideLayoutRoute.tsx"


export const guideRapportsRoute = createRoute({
    getParentRoute: () => guideLayoutRoute,
    path: "/rapports",
    beforeLoad: () => ({
        title: "Generer des rapports - Arrhes"
    }),
    component: () => (
        <GuideRapports />
    )
})
