import { routePath } from "#src/components/_index.js"
import { balanceSheetSchema } from "#src/schemas/balanceSheet.js"
import { documentSchemaReturn } from "#src/schemas/document.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const generateBalanceSheetReportDocumentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-balance-sheet-report-document`,
    schemas: {
        body: v.object({
            idOrganization: balanceSheetSchema.entries.idOrganization,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: documentSchemaReturn
    },
})
