import { createRoute } from "@tanstack/react-router"
import { GuideEcritures } from "../../../../features/docs/dashboard/ecritures.tsx"
import { guideLayoutRoute } from "./guideLayoutRoute.js"


export const guideRecordRowsRoute = createRoute({
    getParentRoute: () => guideLayoutRoute,
    path: "/ecritures",
    beforeLoad: () => ({
        title: "Saisir des ecritures - Arrhes"
    }),
    component: () => (
        <GuideEcritures />
    )
})
