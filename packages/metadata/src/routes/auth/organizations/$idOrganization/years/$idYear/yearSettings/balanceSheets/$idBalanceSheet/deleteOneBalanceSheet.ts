import { routePath } from "../../../../../../../../../components/_index.js"
import { balanceSheetSchema } from "../../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-balance-sheet`,
    schemas: {
        body: v.object({
            idBalanceSheet: balanceSheetSchema.entries.id,
            idOrganization: balanceSheetSchema.entries.idOrganization,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
