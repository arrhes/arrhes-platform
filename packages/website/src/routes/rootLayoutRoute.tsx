import { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { CircularLoader } from "../components/layouts/circularLoader.js"
import { RootLayout } from "../features/rootLayout.js"


export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
    isAuthenticated: boolean | undefined
    userSession: Promise<v.InferOutput<typeof readUserSessionRouteDefinition.schemas.return> | undefined> | undefined
}>()({
    pendingComponent: () => (
        <CircularLoader
            text="Application loading..."
        />
    ),
    beforeLoad: ({ }) => { },
    component: () => {
        const matches = useRouterState({ select: (s) => s.matches })

        const matchWithTitle = [...matches]
            .reverse()
            .find((d) => d.context.title)

        const title = matchWithTitle?.context.title || "Arrhes"

        return (
            <Fragment>
                <title>{title}</title>
                <RootLayout />
            </Fragment>
        )
    },
})
