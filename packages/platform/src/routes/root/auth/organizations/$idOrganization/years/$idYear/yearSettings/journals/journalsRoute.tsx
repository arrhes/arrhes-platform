import { JournalsPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsPage.js"
import { journalsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const journalsRoute = createRoute({
    getParentRoute: () => journalsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <JournalsPage />
    )
})
