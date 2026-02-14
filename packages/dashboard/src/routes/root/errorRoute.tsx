import { ErrorPage } from "../../features/error/errorPage.js"
import { rootLayoutRoute } from "../../routes/rootLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const errorRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/error",
    beforeLoad: () => ({
        title: "Error"
    }),
    component: () => (
        <ErrorPage />
    )
})
