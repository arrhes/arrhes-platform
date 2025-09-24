import { routePath } from "#src/components/_index.js"
import { journalSchema } from "#src/schemas/journal.js"
import { yearSchema } from "#src/schemas/year.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const settleBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/settle-balance-sheet`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idOrganization: yearSchema.entries.idOrganization,
            idJournalClosing: v.nonNullable(journalSchema.entries.id, "Le journal doit être renseigné")
        }),
        return: v.object({})
    },
})
