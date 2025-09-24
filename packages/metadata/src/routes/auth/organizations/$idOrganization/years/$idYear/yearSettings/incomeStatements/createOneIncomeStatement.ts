import { routePath } from "#src/components/_index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "#src/schemas/incomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-income-statement`,
    schemas: {
        body: v.object({
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
            idIncomeStatementParent: incomeStatementSchema.entries.idIncomeStatementParent,
            number: incomeStatementSchema.entries.number,
            label: incomeStatementSchema.entries.label,
            netAmountAdded: incomeStatementSchema.entries.netAmountAdded
        }),
        return: incomeStatementSchemaReturn
    },
})
