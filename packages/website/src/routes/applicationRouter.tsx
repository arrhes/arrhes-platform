import { type AnyRouter, createRouter, type LinkProps } from "@tanstack/react-router"
import { getIsAuthenticated } from "../utilities/cookies/getIsAuthenticated.js"
import { getUserSession } from "../utilities/cookies/getUserSession.js"
import { applicationTree } from "./applicationTree.js"

export type ValidRoutes = LinkProps["to"]
export type ValidParams = LinkProps["params"]

export const applicationRouter: AnyRouter = createRouter({
    routeTree: applicationTree,
    context: {
        title: undefined,
        isAuthenticated: getIsAuthenticated(),
        userSession: getUserSession(),
    },
})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof applicationRouter
    }
}
