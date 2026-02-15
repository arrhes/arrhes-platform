import { createRoute, Outlet } from "@tanstack/react-router"
import { yearLayoutRoute } from "../yearLayoutRoute.js"


export const attachmentsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/fichiers",
    beforeLoad: () => ({
        title: "Stockage"
    }),
    component: () => (
        <Outlet />
    )
})
