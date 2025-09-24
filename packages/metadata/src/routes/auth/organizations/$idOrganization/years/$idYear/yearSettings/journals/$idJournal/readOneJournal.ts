import { routePath } from "#src/components/_index.js"
import { journalSchema, journalSchemaReturn } from "#src/schemas/journal.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
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
