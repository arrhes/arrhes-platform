import { createRoute } from "@tanstack/react-router"
import { IncomeStatementReportPage } from "features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementReportPage"
import { reportsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute"


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
