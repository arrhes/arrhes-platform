import { authLayoutRoute } from "#/routes/root/authLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const settingsLayoutRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres"
    }),
    component: () => (
        <Outlet />
    )
})
