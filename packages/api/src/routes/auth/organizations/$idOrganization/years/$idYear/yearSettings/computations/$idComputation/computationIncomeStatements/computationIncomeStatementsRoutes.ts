import { $idComputationIncomeStatementRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/$idComputationIncomeStatementRoutes.js"
import { createOneComputationIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/createOneComputationIncomeStatement.js"
import { readAllComputationIncomeStatementsRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/readAllComputationIncomeStatements.js"


export const computationIncomeStatementsRoutes = [
    createOneComputationIncomeStatementRoute,
    readAllComputationIncomeStatementsRoute,

    ...$idComputationIncomeStatementRoutes,
]

