import { createRoute, redirect } from "@tanstack/react-router"
import { CircularLoader } from "../../../components/layouts/circularLoader.js"
import { SignUpPage } from "../../../features/signUp/signUpPage.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"


export const signUpRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: '/sign-up',
    pendingComponent: () => (
        <CircularLoader />
    ),
    beforeLoad: async ({ context }) => {
        if (context.isAuthenticated === true) {
            throw redirect({
                to: '/dashboard'
            })
        }
        return ({
            title: "Inscription",
            description: "Veuillez entrer les informations necessaires a l'inscription"
        })
    },
    component: () => (
        <SignUpPage />
    )
})
