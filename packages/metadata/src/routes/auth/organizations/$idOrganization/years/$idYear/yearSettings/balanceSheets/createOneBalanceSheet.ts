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
            index: balanceSheetSchema.entries.index,
            isComputed: balanceSheetSchema.entries.isComputed,
            side: balanceSheetSchema.entries.side,
            number: balanceSheetSchema.entries.number,
            label: balanceSheetSchema.entries.label,
        }),
        return: balanceSheetSchemaReturn
    },
})
