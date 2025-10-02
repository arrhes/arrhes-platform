import { FormatNull } from "#/components/formats/formatNull.js"
import { InputDebounced } from "#/components/inputs/inputDebounced.js"
import { InputText } from "#/components/inputs/inputText.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { BalanceSheetItem } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetItem.js"
import { sortBalanceSheets } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/sortBalanceSheets.js"
import { readAllBalanceSheetsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { useState } from "react"
import * as v from "valibot"


export function BalanceSheetAssetsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    const [globalFilter, setGlobalFilter] = useState("")

    return (
        <DataWrapper
            routeDefinition={readAllBalanceSheetsRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
                idYear: props.idYear
            }}
        >
            {(balanceSheets) => {
                const balanceSheetAssets = balanceSheets.filter((balanceSheet) => balanceSheet.side === "asset")

                const groupedBalanceSheets = sortBalanceSheets({
                    balanceSheets: balanceSheetAssets,
                })
                    .filter((sortedBalanceSheet) => {
                        const processedAccount = `${sortedBalanceSheet.balanceSheet.number} ${sortedBalanceSheet.balanceSheet.label}`.toLowerCase()
                        const processedFilter = globalFilter.toLowerCase()
                        return processedAccount.includes(processedFilter)
                    })
                    .sort((a, b) => a.balanceSheet.number.toString().localeCompare(b.balanceSheet.number.toString()))

                return (
                    <div className="h-fit w-fit flex flex-col justify-start items-start gap-4">
                        <InputDebounced
                            value={globalFilter ?? ""}
                            onChange={(value) => setGlobalFilter(value ?? "")}
                        >
                            <InputText
                                placeholder="Recherche"
                                className="max-w-[320px]"
                            />
                        </InputDebounced>
                        <div className="h-fit w-fit flex flex-col justify-start items-start">
                            {
                                (groupedBalanceSheets.length !== 0)
                                    ? (null)
                                    : (
                                        <FormatNull
                                            text="Aucune ligne de bilan n'a été trouvée"
                                            className="p-2"
                                        />
                                    )
                            }
                            {groupedBalanceSheets.map((groupedBalanceSheet) => (
                                <BalanceSheetItem
                                    key={groupedBalanceSheet.balanceSheet.id}
                                    idOrganization={props.idOrganization}
                                    idYear={props.idYear}
                                    balanceSheet={groupedBalanceSheet.balanceSheet}
                                    level={groupedBalanceSheet.level}
                                />
                            ))}
                        </div>
                    </div>
                )
            }}
        </DataWrapper>
    )
}