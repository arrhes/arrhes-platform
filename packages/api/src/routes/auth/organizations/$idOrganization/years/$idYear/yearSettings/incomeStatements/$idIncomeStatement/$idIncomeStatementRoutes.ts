import { deleteOneIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/deleteOneIncomeStatement.js";
import { generateIncomeStatementDocumentRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/generateIncomeStatementDocument.js";
import { readOneIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/readOneIncomeStatement.js";
import { updateOneIncomeStatementRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/updateOneIncomeStatement.js";


export const $idIncomeStatementRoutes = [
    deleteOneIncomeStatementRoute,
    generateIncomeStatementDocumentRoute,
    readOneIncomeStatementRoute,
    updateOneIncomeStatementRoute,
]
