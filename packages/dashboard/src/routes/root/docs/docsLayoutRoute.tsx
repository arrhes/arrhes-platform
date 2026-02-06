import { createRoute } from "@tanstack/react-router"
import { CircularLoader } from "../../../components/layouts/circularLoader.js"
import { DocumentationLayout } from "../../../features/docs/documentationLayout.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"


export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/docs",
    pendingComponent: () => (
        <CircularLoader />
    ),
    beforeLoad: () => ({
        title: "Documentation - Arrhes"
    }),
    component: () => (
        <DocumentationLayout />
    )
})
