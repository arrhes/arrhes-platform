import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function sortBalanceSheets(parameters: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}) {
    if (parameters.balanceSheets.length === 0) return []

    const map = new Map(parameters.balanceSheets.map(i => [i.id, i]))

    function getLevel(balanceSheet: (typeof parameters.balanceSheets)[number]) {
        let level = 0
        let current = balanceSheet
        while (current.idBalanceSheetParent && map.has(current.idBalanceSheetParent)) {
            current = map.get(current.idBalanceSheetParent)!
            level += 1
        }
        return level
    }

    return parameters.balanceSheets
        .map((balanceSheet) => {
            return ({
                balanceSheet: balanceSheet,
                level: getLevel(balanceSheet)
            })
        })
}
