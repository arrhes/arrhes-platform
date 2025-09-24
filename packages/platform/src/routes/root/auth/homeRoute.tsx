import { createRoute } from "@tanstack/react-router"
import { HomePage } from "features/home/homePage"
import { authLayoutRoute } from "routes/root/authLayoutRoute"


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