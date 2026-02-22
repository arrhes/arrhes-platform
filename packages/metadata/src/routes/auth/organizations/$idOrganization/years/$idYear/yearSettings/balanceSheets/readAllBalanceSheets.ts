import { routePath } from "../../../../../../../../components/_index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllBalanceSheetsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-balance-sheets`,
    schemas: {
        body: v.object({
            idOrganization: balanceSheetSchema.entries.idOrganization,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: v.array(balanceSheetSchemaReturn)
    },
})
