import { journalsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const journalLayoutRoute = createRoute({
    getParentRoute: () => journalsLayoutRoute,
    path: "/$idJournal",
    beforeLoad: () => ({
        title: "Journal"
    }),
    component: () => (
        <Outlet />
    )
})
