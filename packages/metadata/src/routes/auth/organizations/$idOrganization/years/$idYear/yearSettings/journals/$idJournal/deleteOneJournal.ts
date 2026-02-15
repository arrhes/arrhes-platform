import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { journalSchema } from "../../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"


export const deleteOneJournalRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-journal`,
    schemas: {
        body: v.object({
            idJournal: journalSchema.entries.id,
            idOrganization: journalSchema.entries.idOrganization,
            idYear: journalSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
