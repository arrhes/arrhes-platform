import { Balance } from "#src/utilities/email/templates/balanceSheet/getBalance.js"
import { schemas } from "@arrhes/schemas/schemas"
import * as v from "valibot"


export type BalanceSheetLiability = {
    id: string
    number: string
    label: string
    net: number
    balanceSheets: BalanceSheetLiability[]
}

export function groupBalanceSheetsLiabilities(parameters: {
    balanceSheets: Array<v.InferOutput<typeof schemas.balanceSheet>>
    balance: Array<Balance>
    idBalanceSheetParent?: string | null
}): BalanceSheetLiability[] {
    return parameters.balanceSheets
        .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === parameters.idBalanceSheetParent)
        .map((balanceSheet) => {
            const childrenBalanceSheets = groupBalanceSheetsLiabilities({
                balanceSheets: parameters.balanceSheets,
                balance: parameters.balance,
                idBalanceSheetParent: balanceSheet.id
            })

            let net = 0

            if (childrenBalanceSheets.length === 0) {
                parameters.balance
                    .forEach((_balance) => {
                        if (_balance.account.balanceSheetFlow === "debit") net += _balance.balance.debit
                        if (_balance.account.balanceSheetFlow === "credit") net += _balance.balance.credit
                    })
            } else {
                childrenBalanceSheets.forEach((childBalanceSheet) => {
                    net += childBalanceSheet.net
                })
            }

            return ({
                id: balanceSheet.id,
                number: balanceSheet.number,
                label: balanceSheet.label,
                net: net + Number(balanceSheet.amortizationAmountAdded) + Number(balanceSheet.grossAmountAdded),
                balanceSheets: childrenBalanceSheets
            })
        })
}
