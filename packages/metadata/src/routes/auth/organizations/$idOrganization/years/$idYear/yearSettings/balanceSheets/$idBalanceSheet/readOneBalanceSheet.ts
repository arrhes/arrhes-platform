import { routePath } from "#src/components/_index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "#src/schemas/balanceSheet.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-balance-sheet`,
    schemas: {
        body: v.object({
            idBalanceSheet: balanceSheetSchema.entries.id,
            idOrganization: balanceSheetSchema.entries.idOrganization,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: balanceSheetSchemaReturn
    },
})
