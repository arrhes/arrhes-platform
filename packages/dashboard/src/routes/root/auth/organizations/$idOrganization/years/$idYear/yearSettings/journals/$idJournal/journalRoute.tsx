import { JournalPage } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalPage.js"
import { journalLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
