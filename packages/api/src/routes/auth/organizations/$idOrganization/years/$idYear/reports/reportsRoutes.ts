import { documentsRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/reports/document/documentsRoutes.js";
import { generateBalanceSheetReportDocumentRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/reports/generateBalanceSheetReportDocument.js";
import { generateIncomeStatementReportDocumentRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/reports/generateIncomeStatementReportDocument.js";


export const reportsRoutes = [
    generateIncomeStatementReportDocumentRoute,
    generateBalanceSheetReportDocumentRoute,

    ...documentsRoutes,
]
