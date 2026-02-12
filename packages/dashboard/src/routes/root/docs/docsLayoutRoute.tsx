import { createRoute } from "@tanstack/react-router"
import { CircularLoader } from "../../../components/layouts/circularLoader.js"
import { DocumentationLayout } from "../../../features/docs/documentationLayout.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"


export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    pendingComponent: () => (
        <CircularLoader />
    ),
    beforeLoad: () => ({
        title: "Documentation"
    }),
    component: () => (
        <DocumentationLayout />
    )
})
