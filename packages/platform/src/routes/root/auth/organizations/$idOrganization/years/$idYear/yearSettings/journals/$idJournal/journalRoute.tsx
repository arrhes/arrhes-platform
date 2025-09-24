import { createRoute } from "@tanstack/react-router"
import { JournalPage } from "features/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalPage"
import { journalLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalLayoutRoute"


export const journalRoute = createRoute({
    getParentRoute: () => journalLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <JournalPage />
    )
})
