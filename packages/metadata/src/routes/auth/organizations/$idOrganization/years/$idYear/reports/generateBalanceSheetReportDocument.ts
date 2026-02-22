import { routePath } from "../../../../../../../components/_index.js"
import { balanceSheetSchema } from "../../../../../../../schemas/balanceSheet.js"
import { documentSchemaReturn } from "../../../../../../../schemas/document.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"
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
