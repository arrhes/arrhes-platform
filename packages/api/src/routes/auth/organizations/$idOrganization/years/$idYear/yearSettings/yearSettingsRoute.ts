import { accountsRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoutes.js"
import { balanceSheetsRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoutes.js"
import { computationsRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/computationsRoutes.js"
import { generalRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/generalRoutes.js"
import { incomeStatementsRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoutes.js"
import { journalsRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoutes.js"


export const yearSettingsRoute = [
    ...generalRoutes,
    ...accountsRoutes,
    ...journalsRoutes,
    ...balanceSheetsRoutes,
    ...incomeStatementsRoutes,
    ...computationsRoutes,
]