import { routePath } from "#src/components/_index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "#src/schemas/balanceSheet.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-balance-sheet`,
    schemas: {
        body: v.object({
            idOrganization: balanceSheetSchema.entries.idOrganization,
            idYear: balanceSheetSchema.entries.idYear,
            idBalanceSheetParent: balanceSheetSchema.entries.idBalanceSheetParent,
            side: balanceSheetSchema.entries.side,
            number: balanceSheetSchema.entries.number,
            label: balanceSheetSchema.entries.label,
            grossAmountAdded: balanceSheetSchema.entries.grossAmountAdded,
            amortizationAmountAdded: balanceSheetSchema.entries.amortizationAmountAdded,
            netAmountAdded: balanceSheetSchema.entries.netAmountAdded,
        }),
        return: balanceSheetSchemaReturn
    },
})
