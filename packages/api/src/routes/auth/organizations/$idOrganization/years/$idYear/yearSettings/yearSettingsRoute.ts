import { accountsRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoutes.js"
import { balanceSheetsRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoutes.js"
import { computationsRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/computationsRoutes.js"
import { generalRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/generalRoutes.js"
import { incomeStatementsRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoutes.js"
import { journalsRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoutes.js"
import { recordLabelsRoutes } from "../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsRoutes.js"

export const yearSettingsRoute = [
    ...generalRoutes,
    ...accountsRoutes,
    ...journalsRoutes,
    ...balanceSheetsRoutes,
    ...incomeStatementsRoutes,
    ...computationsRoutes,
    ...recordLabelsRoutes,
]
