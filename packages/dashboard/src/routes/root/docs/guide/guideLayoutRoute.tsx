import { createRoute, Outlet } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"


export const guideLayoutRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/dashboard",
    component: () => (
        <Outlet />
    )
})
