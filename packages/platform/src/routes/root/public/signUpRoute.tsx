import { createRoute, redirect } from "@tanstack/react-router"
import { CircularLoader } from "components/layouts/circularLoader"
import { SignUpPage } from "features/signUp/signUpPage"
import { publicLayoutRoute } from "routes/root/publicLayoutRoute"


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
