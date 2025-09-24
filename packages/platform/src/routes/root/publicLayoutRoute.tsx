import { createRoute, Outlet } from "@tanstack/react-router"
import { CircularLoader } from "components/layouts/circularLoader"
import { rootLayoutRoute } from "routes/rootLayoutRoute"


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
