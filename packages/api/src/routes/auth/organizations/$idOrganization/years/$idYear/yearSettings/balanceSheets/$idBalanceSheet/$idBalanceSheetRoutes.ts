import { deleteOneBalanceSheetRoute } from "../../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/deleteOneBalanceSheet.js"
import { readOneBalanceSheetRoute } from "../../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/readOneBalanceSheet.js"
import { updateOneBalanceSheetRoute } from "../../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/updateOneBalanceSheet.js"


export const $idBalanceSheetRoutes = [
    deleteOneBalanceSheetRoute,
    readOneBalanceSheetRoute,
    updateOneBalanceSheetRoute,
]