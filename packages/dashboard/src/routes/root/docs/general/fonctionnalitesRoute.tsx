import { createRoute } from "@tanstack/react-router"
import { FeaturesPage } from "../../../../features/docs/root/features/featuresPage.tsx"
import { docsLayoutRoute } from "../docsLayoutRoute.tsx"


export const fonctionnalitesRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/fonctionnalites",
    beforeLoad: () => ({
        title: "Fonctionnalités - Arrhes"
    }),
    component: () => (
        <FeaturesPage />
    )
})
