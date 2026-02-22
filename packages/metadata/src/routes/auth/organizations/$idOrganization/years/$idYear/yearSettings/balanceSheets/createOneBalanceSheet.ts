import { routePath } from "../../../../../../../../components/_index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-balance-sheet`,
    schemas: {
        body: v.object({
            idOrganization: balanceSheetSchema.entries.idOrganization,
            idYear: balanceSheetSchema.entries.idYear,
            idBalanceSheetParent: balanceSheetSchema.entries.idBalanceSheetParent,
            isComputed: balanceSheetSchema.entries.isComputed,
            side: balanceSheetSchema.entries.side,
            number: balanceSheetSchema.entries.number,
            label: balanceSheetSchema.entries.label,
        }),
        return: balanceSheetSchemaReturn
    },
})
