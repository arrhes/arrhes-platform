import { deleteOneIncomeStatementRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/deleteOneIncomeStatement.js";
import { readOneIncomeStatementRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/readOneIncomeStatement.js";
import { updateOneIncomeStatementRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/updateOneIncomeStatement.js";


export const $idIncomeStatementRoutes = [
    deleteOneIncomeStatementRoute,
    readOneIncomeStatementRoute,
    updateOneIncomeStatementRoute,
]
