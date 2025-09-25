import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { SignUpPage } from "#/features/signUp/signUpPage.js"
import { publicLayoutRoute } from "#/routes/root/publicLayoutRoute.js"
import { createRoute, redirect } from "@tanstack/react-router"


export const signUpRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/inscription',
    pendingComponent: () => (
        <CircularLoader />
    ),
    beforeLoad: async ({ context }) => {
        if (context.isAuthenticated === true) {
            throw redirect({
                to: '/'
            })
        }
        return ({
            title: "Inscription",
            description: "Veuillez entrer les informations nécessaires à l'inscription"
        })
    },
    component: () => (
        <SignUpPage />
    )
})
