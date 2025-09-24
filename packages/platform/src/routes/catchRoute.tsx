import { createRoute, redirect } from "@tanstack/react-router"
import { rootLayoutRoute } from "./rootLayoutRoute"


export const catchRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: '$',
    beforeLoad: ({ context }) => {
        if (context.isAuthenticated === true) {
            throw redirect({
                to: "/"
            })
        }
        throw redirect({
            to: "/connexion"
        })
    }
})
