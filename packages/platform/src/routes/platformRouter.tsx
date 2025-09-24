import { createRouter, LinkProps } from '@tanstack/react-router'
import { getIsAuthenticated } from 'utilities/cookies/getIsAuthenticated'
import { getUserSession } from 'utilities/cookies/getUserSession'
import { platformTree } from './platformTree'


export type ValidRoutes = LinkProps["to"]
export type ValidParams = LinkProps["params"]


export const platformRouter = createRouter({
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
