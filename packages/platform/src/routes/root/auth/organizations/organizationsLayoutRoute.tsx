import { createRoute, Outlet } from "@tanstack/react-router"
import { authLayoutRoute } from "routes/root/authLayoutRoute"


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
