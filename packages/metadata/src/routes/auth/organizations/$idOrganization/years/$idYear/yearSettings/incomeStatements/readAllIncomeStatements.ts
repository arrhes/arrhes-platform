import { routePath } from "#src/components/_index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "#src/schemas/incomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllIncomeStatementsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-income-statements`,
    schemas: {
        body: v.object({
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: v.array(incomeStatementSchemaReturn)
    },
})
