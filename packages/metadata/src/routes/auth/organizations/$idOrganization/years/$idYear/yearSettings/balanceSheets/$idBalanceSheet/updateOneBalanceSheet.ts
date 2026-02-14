import { routePath } from "../../../../../../../../../components/_index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "../../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
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
            isComputed: v.optional(balanceSheetSchema.entries.isComputed),
            side: v.optional(balanceSheetSchema.entries.side),
            number: v.optional(balanceSheetSchema.entries.number),
            label: v.optional(balanceSheetSchema.entries.label),
        }),
        return: balanceSheetSchemaReturn
    },
})
