import { createRoute, Outlet } from "@tanstack/react-router"
import { journalsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute"


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
