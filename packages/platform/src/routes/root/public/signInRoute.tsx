import { createRoute, redirect } from "@tanstack/react-router"
import { CircularLoader } from "components/layouts/circularLoader"
import { SignInPage } from "features/signIn/signInPage"
import { publicLayoutRoute } from "routes/root/publicLayoutRoute"


export const signInRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/connexion',
    pendingComponent: () => <CircularLoader />,
    beforeLoad: async ({ context }) => {
        if (context.isAuthenticated === true) {
            throw redirect({ to: "/" })
        }
        return ({
            title: "Connexion"
        })
    },
    component: () => (
        <SignInPage />
    )
})
