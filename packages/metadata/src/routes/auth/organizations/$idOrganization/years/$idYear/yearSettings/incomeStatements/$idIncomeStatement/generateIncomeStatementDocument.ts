import { routePath } from "#src/components/_index.js"
import { documentSchemaReturn } from "#src/schemas/document.js"
import { incomeStatementSchema } from "#src/schemas/incomeStatement.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const generateIncomeStatementDocumentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-income-statement-document`,
    schemas: {
        body: v.object({
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: documentSchemaReturn
    },
})
