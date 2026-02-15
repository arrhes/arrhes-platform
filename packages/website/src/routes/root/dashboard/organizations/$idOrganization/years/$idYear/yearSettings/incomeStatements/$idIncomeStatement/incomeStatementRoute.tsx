import { createRoute } from "@tanstack/react-router"
import { IncomeStatementPage } from "../../../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementPage.js"
import { incomeStatementLayoutRoute } from "./incomeStatementLayoutRoute.js"


export const incomeStatementRoute = createRoute({
    getParentRoute: () => incomeStatementLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined
    }),
    component: () => (
        <IncomeStatementPage />
    )
})
