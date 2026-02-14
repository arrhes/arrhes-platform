import { closeYearRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/closeYear.js"
import { deleteOneYearRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/deleteOneYear.js"
import { openYearRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/openYear.js"
import { settleBalanceSheetRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/settleBalanceSheet.js"
import { settleIncomeStatementRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/settleIncomeStatement.js"
import { updateOneYearRoute } from "../../../../../../../../routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/general/updateOneYear.js"


export const generalRoutes = [
    closeYearRoute,
    deleteOneYearRoute,
    openYearRoute,
    settleBalanceSheetRoute,
    settleIncomeStatementRoute,
    updateOneYearRoute,
]
