import { routePath } from "../../../../../../../components/_index.js"
import { documentSchemaReturn } from "../../../../../../../schemas/document.js"
import { incomeStatementSchema } from "../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const generateIncomeStatementReportDocumentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-income-statement-report-document`,
    schemas: {
        body: v.object({
            idOrganization: incomeStatementSchema.entries.idOrganization,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: documentSchemaReturn
    },
})
