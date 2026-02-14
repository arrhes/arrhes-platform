import { deleteOneJournalRoute } from "../../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/deleteOneJournal.js"
import { readOneJournalRoute } from "../../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/readOneJournal.js"
import { updateOneJournalRoute } from "../../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/updateOneJournal.js"


export const $idJournalRoutes = [
    deleteOneJournalRoute,
    readOneJournalRoute,
    updateOneJournalRoute,
]
