import { createRoute } from "@tanstack/react-router"
import { GuideOrganisations } from "../../../../features/docs/guide/organisations.tsx"
import { guideLayoutRoute } from "./guideLayoutRoute.js"


export const guideOrganisationsRoute = createRoute({
    getParentRoute: () => guideLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Gerer les organisations - Arrhes"
    }),
    component: () => (
        <GuideOrganisations />
    )
})
