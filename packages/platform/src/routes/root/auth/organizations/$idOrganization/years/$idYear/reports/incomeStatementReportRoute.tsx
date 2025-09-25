import { IncomeStatementReportPage } from "#/features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementReportPage.js"
import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


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
