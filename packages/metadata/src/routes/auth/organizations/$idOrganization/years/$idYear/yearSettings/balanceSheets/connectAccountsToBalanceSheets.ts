import { routePath } from "../../../../../../../../components/_index.js"
import { incomeStatementSchema } from "../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
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
