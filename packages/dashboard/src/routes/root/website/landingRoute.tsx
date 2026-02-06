import { createRoute } from "@tanstack/react-router"
import { LandingPage } from "../../../features/website/landingPage.tsx"
import { websiteLayoutRoute } from "./websiteLayoutRoute.tsx"


export const websiteRootRoute = createRoute({
    getParentRoute: () => websiteLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Arrhes - Logiciel de comptabilite libre"
    }),
    component: () => (
        <LandingPage />
    )
})
