import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { SignInPage } from "#/features/signIn/signInPage.js"
import { publicLayoutRoute } from "#/routes/root/publicLayoutRoute.js"
import { createRoute, redirect } from "@tanstack/react-router"


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
