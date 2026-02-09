import { createRoute, Outlet } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"


export const accountingLayoutRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/comptabilite",
    component: () => (
        <Outlet />
    )
})
