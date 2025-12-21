import { authLayoutRoute } from "#/routes/root/authLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const organizationsLayoutRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <Outlet />
    )
})
