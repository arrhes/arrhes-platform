import { routePath } from "#src/components/_index.js"
import { accountSchema, accountSchemaReturn } from "#src/schemas/account.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-account`,
    schemas: {
        body: v.object({
            idOrganization: accountSchema.entries.idOrganization,
            idYear: accountSchema.entries.idYear,
            idAccountParent: accountSchema.entries.idAccountParent,

            idBalanceSheetAsset: v.optional(accountSchema.entries.idBalanceSheetAsset),
            idBalanceSheetLiability: v.optional(accountSchema.entries.idBalanceSheetLiability),
            balanceSheetAssetColumn: v.optional(accountSchema.entries.balanceSheetAssetColumn),
            balanceSheetLiabilityColumn: v.optional(accountSchema.entries.balanceSheetLiabilityColumn),

            idIncomeStatement: v.optional(accountSchema.entries.idIncomeStatement),

            isClass: accountSchema.entries.isClass,
            isSelectable: accountSchema.entries.isSelectable,
            number: accountSchema.entries.number,
            label: accountSchema.entries.label,
            type: accountSchema.entries.type
        }),
        return: accountSchemaReturn
    },
})
