import { createRoute } from "@tanstack/react-router"
import { JournalsPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsPage"
import { journalsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute"


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
