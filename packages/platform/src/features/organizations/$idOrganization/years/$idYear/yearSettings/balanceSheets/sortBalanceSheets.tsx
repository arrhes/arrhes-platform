import { getBalanceSheetLevel } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/getBalanceSheetLevel.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function sortBalanceSheets(parameters: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}) {
    if (parameters.balanceSheets.length === 0) return []

    return parameters.balanceSheets
        .map((balanceSheet) => {
            return ({
                balanceSheet: balanceSheet,
                level: getBalanceSheetLevel({
                    balanceSheet: balanceSheet,
                    balanceSheets: parameters.balanceSheets
                })
            })
        })
}
