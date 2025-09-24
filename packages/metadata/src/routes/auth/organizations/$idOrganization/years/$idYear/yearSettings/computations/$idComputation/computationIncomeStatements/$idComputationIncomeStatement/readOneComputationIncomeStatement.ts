import { routePath } from "#src/components/_index.js"
import { computationIncomeStatementSchema, computationIncomeStatementSchemaReturn } from "#src/schemas/computationIncomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneComputationIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-computation-income-statement`,
    schemas: {
        body: v.object({
            idComputationIncomeStatement: computationIncomeStatementSchema.entries.id,
            idOrganization: computationIncomeStatementSchema.entries.idOrganization,
            idYear: computationIncomeStatementSchema.entries.idYear,
        }),
        return: computationIncomeStatementSchemaReturn
    },
})
