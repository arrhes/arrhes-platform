import { routePath } from "../../../../../../../../../components/_index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneJournalRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-journal`,
    schemas: {
        body: v.object({
            idJournal: journalSchema.entries.id,
            idOrganization: journalSchema.entries.idOrganization,
            idYear: journalSchema.entries.idYear,
        }),
        return: journalSchemaReturn
    },
})
