import { createRoute } from "@tanstack/react-router"
import { WebsitePage } from "../../../features/website/websitePage.tsx"
import { websiteLayoutRoute } from "./websiteLayoutRoute.tsx"


export const websiteRootRoute = createRoute({
    getParentRoute: () => websiteLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Arrhes"
    }),
    component: () => (
        <WebsitePage />
    )
})
