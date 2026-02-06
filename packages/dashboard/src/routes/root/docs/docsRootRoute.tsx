import { createRoute } from "@tanstack/react-router"
import { DocumentationIndex } from "../../../features/docs/documentationIndex.tsx"
import { docsLayoutRoute } from "./docsLayoutRoute.tsx"


export const docsRootRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documentation - Arrhes"
    }),
    component: () => (
        <DocumentationIndex />
    )
})
