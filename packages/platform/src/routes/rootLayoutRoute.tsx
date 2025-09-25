import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { RootLayout } from "#/features/rootLayout.js"
import { readUserSessionRouteDefinition } from "@arrhes/metadata/routes"
import { createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
    isAuthenticated: boolean | undefined
    userSession: Promise<v.InferOutput<typeof readUserSessionRouteDefinition.schemas.return> | undefined> | undefined
}>()({
    pendingComponent: () => (
        <CircularLoader
            text="Platform loading..."
        />
    ),
    beforeLoad: ({ }) => { },
    component: () => {
        const matches = useRouterState({ select: (s) => s.matches })

        const matchWithTitle = [...matches]
            .reverse()
            .find((d) => d.context.title)

        const title = matchWithTitle?.context.title || "arrhes"

        return (
            <Fragment>
                <title>{title}</title>
                <RootLayout />
            </Fragment>
        )
    },
})
