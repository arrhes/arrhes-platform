import { platformTree } from "../routes/platformTree.js"
import { getIsAuthenticated } from "../utilities/cookies/getIsAuthenticated.js"
import { getUserSession } from "../utilities/cookies/getUserSession.js"
import { createRouter, LinkProps, AnyRouter } from '@tanstack/react-router'


export type ValidRoutes = LinkProps["to"]
export type ValidParams = LinkProps["params"]


export const platformRouter: AnyRouter = createRouter({
    routeTree: platformTree,
    context: {
        title: undefined,
        isAuthenticated: getIsAuthenticated(),
        userSession: getUserSession()
    }
})


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof platformRouter
    }
}
