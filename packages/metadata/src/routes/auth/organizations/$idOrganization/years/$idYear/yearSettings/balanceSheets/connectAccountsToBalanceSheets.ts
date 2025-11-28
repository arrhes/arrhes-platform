import { routePath } from "#src/components/_index.js"
import { incomeStatementSchema } from "#src/schemas/incomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const connectAccountsToBalanceSheetsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/connect-accounts-to-balance-sheets`,
    schemas: {
        body: v.object({
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
