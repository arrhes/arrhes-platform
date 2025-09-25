import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { rootLayoutRoute } from "#/routes/rootLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const publicLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "publicLayout",
    pendingComponent: () => (
        <CircularLoader />
    ),
    beforeLoad: () => { },
    component: () => (
        <Outlet />
    )
})
