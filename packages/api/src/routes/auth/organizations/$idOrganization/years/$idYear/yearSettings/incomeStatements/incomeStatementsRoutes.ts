import { $idIncomeStatementRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/$idIncomeStatementRoutes.js"
import { createOneIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/createOneIncomeStatement.js"
import { generateIncomeStatementsRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/generateIncomeStatements.js"
import { readAllIncomeStatementsRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/readAllIncomeStatements.js"


export const incomeStatementsRoutes = [
    createOneIncomeStatementRoute,
    readAllIncomeStatementsRoute,
    generateIncomeStatementsRoute,

    ...$idIncomeStatementRoutes,
]

