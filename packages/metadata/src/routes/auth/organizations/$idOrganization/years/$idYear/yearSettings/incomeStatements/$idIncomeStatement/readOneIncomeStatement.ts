import { routePath } from "#src/components/_index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "#src/schemas/incomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-income-statement`,
    schemas: {
        body: v.object({
            idIncomeStatement: incomeStatementSchema.entries.id,
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: incomeStatementSchemaReturn
    },
})
