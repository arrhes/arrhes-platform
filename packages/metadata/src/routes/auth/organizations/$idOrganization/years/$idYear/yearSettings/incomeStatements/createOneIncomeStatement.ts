import { routePath } from "../../../../../../../../components/_index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-income-statement`,
    schemas: {
        body: v.object({
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
            idIncomeStatementParent: incomeStatementSchema.entries.idIncomeStatementParent,
            isComputed: incomeStatementSchema.entries.isComputed,
            number: incomeStatementSchema.entries.number,
            label: incomeStatementSchema.entries.label
        }),
        return: incomeStatementSchemaReturn
    },
})
