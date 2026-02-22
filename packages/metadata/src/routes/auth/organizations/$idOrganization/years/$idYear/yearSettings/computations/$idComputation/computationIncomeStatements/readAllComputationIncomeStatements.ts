import { routePath } from "../../../../../../../../../../components/_index.js"
import { computationIncomeStatementSchema, computationIncomeStatementSchemaReturn } from "../../../../../../../../../../schemas/computationIncomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllComputationIncomeStatementsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-computation-income-statements`,
    schemas: {
        body: v.object({
            idOrganization: computationIncomeStatementSchema.entries.idOrganization,
            idYear: computationIncomeStatementSchema.entries.idYear,
            idComputation: v.optional(computationIncomeStatementSchema.entries.idComputation),
            idIncomeStatement: v.optional(computationIncomeStatementSchema.entries.idIncomeStatement),
        }),
        return: v.array(computationIncomeStatementSchemaReturn)
    },
})
