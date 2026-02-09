import { createRoute } from "@tanstack/react-router"
import { DashboardIndex } from "../../../../features/docs/dashboardIndex.tsx"
import { guideLayoutRoute } from "./guideLayoutRoute.tsx"


export const guideIndexRoute = createRoute({
    getParentRoute: () => guideLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Guide d'utilisation"
    }),
    component: () => (
        <DashboardIndex />
    )
})
