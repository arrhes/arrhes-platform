import { routePath } from "../../../../../../../../components/_index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
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
