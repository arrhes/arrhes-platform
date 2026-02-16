import { $idBalanceSheetRoutes } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/$idBalanceSheetRoutes.js"
import { connectAccountsToBalanceSheetsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/connectAccountsToBalanceSheets.js"
import { createOneBalanceSheetRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/createOneBalanceSheet.js"
import { generateBalanceSheetsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/generateBalanceSheets.js"
import { readAllBalanceSheetsRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/readAllBalanceSheets.js"

export const balanceSheetsRoutes = [
    createOneBalanceSheetRoute,
    readAllBalanceSheetsRoute,
    generateBalanceSheetsRoute,
    connectAccountsToBalanceSheetsRoute,

    ...$idBalanceSheetRoutes,
]
