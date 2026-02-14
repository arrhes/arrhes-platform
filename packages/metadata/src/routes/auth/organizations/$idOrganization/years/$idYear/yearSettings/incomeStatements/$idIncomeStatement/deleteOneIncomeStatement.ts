import { routePath } from "../../../../../../../../../components/_index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "../../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-income-statement`,
    schemas: {
        body: v.object({
            idIncomeStatement: incomeStatementSchema.entries.id,
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: incomeStatementSchemaReturn
    },
})
