import { deleteOneIncomeStatementRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/deleteOneIncomeStatement.js";
import { generateIncomeStatementDocumentRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/generateIncomeStatementDocument.js";
import { readOneIncomeStatementRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/readOneIncomeStatement.js";
import { updateOneIncomeStatementRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/updateOneIncomeStatement.js";


export const $idIncomeStatementRoutes = [
    deleteOneIncomeStatementRoute,
    generateIncomeStatementDocumentRoute,
    readOneIncomeStatementRoute,
    updateOneIncomeStatementRoute,
]
