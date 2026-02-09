import { createRoute } from "@tanstack/react-router"
import { ApiIndex } from "../../../../features/docs/apiIndex.js"
import { apiLayoutRoute } from "./apiLayoutRoute.js"


export const apiIndexRoute = createRoute({
    getParentRoute: () => apiLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "API - Documentation - Arrhes"
    }),
    component: () => (
        <ApiIndex />
    )
})
