import { HomePage } from "#/features/home/homePage.js"
import { authLayoutRoute } from "#/routes/root/authLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const homeRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <HomePage />
    )
})