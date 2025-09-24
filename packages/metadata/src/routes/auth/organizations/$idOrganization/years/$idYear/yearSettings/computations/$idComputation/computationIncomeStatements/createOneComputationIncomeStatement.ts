import { routePath } from "#src/components/_index.js"
import { computationIncomeStatementSchema, computationIncomeStatementSchemaReturn } from "#src/schemas/computationIncomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneComputationIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-computation-income-statement`,
    schemas: {
        body: v.object({
            idOrganization: computationIncomeStatementSchema.entries.idOrganization,
            idYear: computationIncomeStatementSchema.entries.idYear,
            idComputation: computationIncomeStatementSchema.entries.idComputation,
            idIncomeStatement: computationIncomeStatementSchema.entries.idIncomeStatement,
            operation: computationIncomeStatementSchema.entries.operation
        }),
        return: computationIncomeStatementSchemaReturn
    },
})
