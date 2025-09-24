import { createRoute } from "@tanstack/react-router"
import { ErrorPage } from "features/error/errorPage"
import { rootLayoutRoute } from "routes/rootLayoutRoute"


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
