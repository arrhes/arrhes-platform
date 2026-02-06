import { createRoute } from "@tanstack/react-router"
import { IncomeStatementReportPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementReportPage.js"
import { reportsLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"


export const incomeStatementReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat"
    }),
    component: () => (
        <IncomeStatementReportPage />
    )
})
