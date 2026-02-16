import { $idIncomeStatementRoutes } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/$idIncomeStatementRoutes.js"
import { connectAccountsToIncomeStatementsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/connectAccountsToIncomeStatements.js"
import { createOneIncomeStatementRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/createOneIncomeStatement.js"
import { generateIncomeStatementsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/generateIncomeStatements.js"
import { readAllIncomeStatementsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/readAllIncomeStatements.js"

export const incomeStatementsRoutes = [
    createOneIncomeStatementRoute,
    readAllIncomeStatementsRoute,
    generateIncomeStatementsRoute,
    connectAccountsToIncomeStatementsRoute,

    ...$idIncomeStatementRoutes,
]
