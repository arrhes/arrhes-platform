import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { AuthLayout } from "#/features/authLayout.js"
import { rootLayoutRoute } from "#/routes/rootLayoutRoute.js"
import { createRoute, redirect } from "@tanstack/react-router"


export const authLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "authLayout",
    pendingComponent: () => (
        <CircularLoader />
    ),
    beforeLoad: ({ context }) => {
        if (context.isAuthenticated !== true) {
            throw redirect({
                to: "/connexion"
            })
        }
    },
    component: () => (
        <AuthLayout />
    )
})
