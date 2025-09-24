import { routePath } from "#src/components/_index.js"
import { accountSchema } from "#src/schemas/account.js"
import { journalSchema } from "#src/schemas/journal.js"
import { yearSchema } from "#src/schemas/year.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const settleIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/settle-income-statement`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idOrganization: yearSchema.entries.idOrganization,
            idJournalClosing: v.nonNullable(journalSchema.entries.id, "Le journal doit être renseigné"),
            idAccountProfit: v.nonNullable(accountSchema.entries.id, "Le compte doit être renseigné"),
            idAccountLoss: v.nonNullable(accountSchema.entries.id, "Le compte doit être renseigné")
        }),
        return: v.object({})
    },
})
