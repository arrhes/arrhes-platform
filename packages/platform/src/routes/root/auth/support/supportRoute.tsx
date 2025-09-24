import { createRoute } from "@tanstack/react-router"
import { SupportPage } from "features/support/supportPage"
import { authLayoutRoute } from "routes/root/authLayoutRoute"


export const supportRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support"
    }),
    component: () => (
        <SupportPage />
    )
})
