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

            idBalanceSheet: v.optional(accountSchema.entries.idBalanceSheet),
            balanceSheetFlow: v.optional(accountSchema.entries.balanceSheetFlow),
            balanceSheetColumn: v.optional(accountSchema.entries.balanceSheetColumn),

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
