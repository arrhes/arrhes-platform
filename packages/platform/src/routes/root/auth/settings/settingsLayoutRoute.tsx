import { createRoute, Outlet } from "@tanstack/react-router"
import { authLayoutRoute } from "routes/root/authLayoutRoute"


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
