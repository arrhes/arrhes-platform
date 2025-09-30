// import { Balance } from "#/utilities/email/templates/balanceSheet/getBalance.js"
// import { schemas } from "@arrhes/metadata/schemas"
// import * as v from "valibot"


// export type IncomeStatementItem = {
//     id: string
//     number: string
//     label: string
//     net: number
//     incomeStatements: Array<IncomeStatementItem>
// }

// export function groupIncomeStatements(parameters: {
//     incomeStatements: Array<v.InferOutput<typeof schemas.incomeStatement>>
//     balance: Array<Balance>
//     idIncomeStatementParent?: string | null
// }): Array<IncomeStatementItem> {
//     return parameters.incomeStatements
//         .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === parameters.idIncomeStatementParent)
//         .map((incomeStatement) => {
//             const childrenIncomeStatements = groupIncomeStatements({
//                 incomeStatements: parameters.incomeStatements,
//                 balance: parameters.balance,
//                 idIncomeStatementParent: incomeStatement.id
//             })

//             let net = 0

//             if (childrenIncomeStatements.length === 0) {
//                 parameters.balance
//                     .forEach((_balance) => {
//                         if (_balance.account.number.toString().at(0) === "6") net += _balance.balance.debit - _balance.balance.credit
//                         if (_balance.account.number.toString().at(0) === "7") net += _balance.balance.credit - _balance.balance.debit
//                     })
//             }
//             else {
//                 childrenIncomeStatements.forEach((childIncomeStatement) => {
//                     net += childIncomeStatement.net
//                 })
//             }

//             return ({
//                 id: incomeStatement.id,
//                 number: incomeStatement.number,
//                 label: incomeStatement.label,
//                 incomeStatements: childrenIncomeStatements
//             })
//         })
// }