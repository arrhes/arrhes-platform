// import { Balance } from "#/utilities/email/templates/balanceSheet/getBalance.js"
// import { schemas } from "@arrhes/metadata/schemas"
// import * as v from "valibot"


// export type BalanceSheetAsset = {
//     id: string
//     number: string
//     label: string
//     gross: number
//     allowance: number
//     net: number
//     balanceSheets: BalanceSheetAsset[]
// }

// export function groupBalanceSheetsAssets(parameters: {
//     balanceSheets: Array<v.InferOutput<typeof schemas.balanceSheet>>
//     balance: Array<Balance>
//     idBalanceSheetParent?: string | null
// }): Array<BalanceSheetAsset> {
//     return parameters.balanceSheets
//         .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === parameters.idBalanceSheetParent)
//         .map((balanceSheet) => {
//             const childrenBalanceSheets = groupBalanceSheetsAssets({
//                 balanceSheets: parameters.balanceSheets,
//                 balance: parameters.balance,
//                 idBalanceSheetParent: balanceSheet.id
//             })

//             let gross = 0
//             let amortization = 0
//             let net = 0

//             if (childrenBalanceSheets.length === 0) {
//                 parameters.balance
//                     .forEach((_balance) => {
//                         if (_balance.account.balanceSheetColumn == "amortization") {
//                             gross += 0
//                             if (_balance.account.balanceSheetFlow === "debit") amortization += - _balance.balance.debit
//                             if (_balance.account.balanceSheetFlow === "credit") amortization += - _balance.balance.credit
//                         } else {
//                             amortization += 0
//                             if (_balance.account.balanceSheetFlow === "debit") gross += _balance.balance.debit
//                             if (_balance.account.balanceSheetFlow === "credit") gross += _balance.balance.credit
//                         }
//                     })
//             } else {
//                 childrenBalanceSheets.forEach((childBalanceSheet) => {
//                     gross += childBalanceSheet.gross
//                     amortization += childBalanceSheet.allowance
//                 })
//             }

//             return ({
//                 id: balanceSheet.id,
//                 number: balanceSheet.number,
//                 label: balanceSheet.label,
//                 gross: gross + Number(balanceSheet.grossAmountAdded),
//                 allowance: amortization + Number(balanceSheet.amortizationAmountAdded),
//                 net: gross + amortization + Number(balanceSheet.grossAmountAdded) + Number(balanceSheet.amortizationAmountAdded),
//                 balanceSheets: childrenBalanceSheets
//             })
//         })
// }
