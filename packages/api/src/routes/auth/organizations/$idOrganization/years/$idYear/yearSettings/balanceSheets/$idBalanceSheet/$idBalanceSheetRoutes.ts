import { deleteOneBalanceSheetRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/deleteOneBalanceSheet.js"
import { generateBalanceSheetDocumentRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/generateBalanceSheetDocument.js"
import { readOneBalanceSheetRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/readOneBalanceSheet.js"
import { updateOneBalanceSheetRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/updateOneBalanceSheet.js"


export const $idBalanceSheetRoutes = [
    deleteOneBalanceSheetRoute,
    generateBalanceSheetDocumentRoute,
    readOneBalanceSheetRoute,
    updateOneBalanceSheetRoute,
]