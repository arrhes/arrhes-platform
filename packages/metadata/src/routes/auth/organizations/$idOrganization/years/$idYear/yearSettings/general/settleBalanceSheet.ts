import { routePath } from "../../../../../../../../components/_index.js"
import { journalSchema } from "../../../../../../../../schemas/journal.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
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
