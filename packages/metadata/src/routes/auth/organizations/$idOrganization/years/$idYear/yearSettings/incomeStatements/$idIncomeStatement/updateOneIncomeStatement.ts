import { routePath } from "#src/components/_index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "#src/schemas/incomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-income-statement`,
    schemas: {
        body: v.object({
            idIncomeStatement: incomeStatementSchema.entries.id,
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
            idIncomeStatementParent: v.optional(incomeStatementSchema.entries.idIncomeStatementParent),
            index: v.optional(incomeStatementSchema.entries.index),
            isComputed: v.optional(incomeStatementSchema.entries.isComputed),
            number: v.optional(incomeStatementSchema.entries.number),
            label: v.optional(incomeStatementSchema.entries.label),
        }),
        return: incomeStatementSchemaReturn
    },
})
