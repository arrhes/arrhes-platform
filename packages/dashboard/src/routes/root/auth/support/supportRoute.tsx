import { SupportPage } from "#/features/support/supportPage.js"
import { authLayoutRoute } from "#/routes/root/authLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
