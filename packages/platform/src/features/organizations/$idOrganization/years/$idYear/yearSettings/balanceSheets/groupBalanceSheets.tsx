import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export type GroupedBalanceSheet = {
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    subBalanceSheets: GroupedBalanceSheet[]
}

export function groupBalanceSheets(parameters: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    digits: number
}) {
    if (parameters.balanceSheets.length === 0) return []
    return parameters.balanceSheets
        .filter((balanceSheet) => balanceSheet.number.toString().length === parameters.digits)
        .map((balanceSheet) => {
            const subBalanceSheets = groupBalanceSheets({
                balanceSheets: parameters.balanceSheets
                    .filter((_balanceSheet) => _balanceSheet.number.toString().slice(0, parameters.digits) === balanceSheet.number.toString().slice(0, parameters.digits)),
                digits: parameters.digits + 1
            }) as GroupedBalanceSheet[]
            return ({
                balanceSheet: balanceSheet,
                subBalanceSheets: subBalanceSheets
            })
        }) as GroupedBalanceSheet[]
}
