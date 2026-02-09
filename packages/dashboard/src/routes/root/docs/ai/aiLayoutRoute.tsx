import { createRoute, Outlet } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"


export const aiLayoutRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/ai",
    component: () => (
        <Outlet />
    )
})
