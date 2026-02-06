import { createRoute } from "@tanstack/react-router"
import { GuideEcritures } from "../../../../features/docs/guide/ecritures.tsx"
import { guideLayoutRoute } from "./guideLayoutRoute.js"


export const guideRecordRowsRoute = createRoute({
    getParentRoute: () => guideLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Saisir des ecritures - Arrhes"
    }),
    component: () => (
        <GuideEcritures />
    )
})
