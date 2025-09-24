import { routePath } from "#src/components/_index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "#src/schemas/balanceSheet.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-balance-sheet`,
    schemas: {
        body: v.object({
            idBalanceSheet: balanceSheetSchema.entries.id,
            idOrganization: balanceSheetSchema.entries.idOrganization,
            idYear: balanceSheetSchema.entries.idYear,
            idBalanceSheetParent: v.optional(balanceSheetSchema.entries.idBalanceSheetParent),
            side: v.optional(balanceSheetSchema.entries.side),
            number: v.optional(balanceSheetSchema.entries.number),
            label: v.optional(balanceSheetSchema.entries.label),
            grossAmountAdded: v.optional(balanceSheetSchema.entries.grossAmountAdded),
            amortizationAmountAdded: v.optional(balanceSheetSchema.entries.amortizationAmountAdded),
            netAmountAdded: v.optional(balanceSheetSchema.entries.netAmountAdded),
        }),
        return: balanceSheetSchemaReturn
    },
})
