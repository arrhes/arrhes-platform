import { CircularLoader } from "@arrhes/ui"
import { createRoute, Outlet } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.tsx"


export const websiteLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "websiteLayout",
    pendingComponent: () => (
        <CircularLoader />
    ),
    beforeLoad: () => { },
    component: () => (
        <Outlet />
    )
})
