import { createRoute, redirect } from "@tanstack/react-router"
import { CircularLoader } from "components/layouts/circularLoader"
import { AuthLayout } from "features/authLayout"
import { rootLayoutRoute } from "routes/rootLayoutRoute"


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
