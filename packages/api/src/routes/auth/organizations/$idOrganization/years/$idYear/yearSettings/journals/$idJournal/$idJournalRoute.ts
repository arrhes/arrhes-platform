import { deleteOneJournalRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/deleteOneJournal.js"
import { readOneJournalRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/readOneJournal.js"
import { updateOneJournalRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/updateOneJournal.js"


export const $idJournalRoutes = [
    deleteOneJournalRoute,
    readOneJournalRoute,
    updateOneJournalRoute,
]
