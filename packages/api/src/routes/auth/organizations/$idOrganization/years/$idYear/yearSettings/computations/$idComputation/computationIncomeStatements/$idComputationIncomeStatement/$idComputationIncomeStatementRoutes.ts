import { deleteOneComputationIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/deleteOneComputationIncomeStatement.js"
import { readOneComputationIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/readOneComputationIncomeStatement.js"
import { updateOneComputationIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/updateOneComputationIncomeStatement.js"


export const $idComputationIncomeStatementRoutes = [
    deleteOneComputationIncomeStatementRoute,
    readOneComputationIncomeStatementRoute,
    updateOneComputationIncomeStatementRoute,
]
