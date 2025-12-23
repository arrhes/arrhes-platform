import { FormatNull } from "#/components/formats/formatNull.js"
import { InputDebounced } from "#/components/inputs/inputDebounced.js"
import { InputText } from "#/components/inputs/inputText.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { BalanceSheetItem } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetItem.js"
import { getBalanceSheetChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/getBalanceSheetChildren.js"
import { readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { useState } from "react"
import * as v from "valibot"


export function BalanceSheetTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    filter: (balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>) => boolean
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
                const sidedBalanceSheets = balanceSheets.filter(props.filter)

                const filteredBalanceSheets = sidedBalanceSheets
                    .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === null)
                    .sort((a, b) => Number(a.number) - Number(b.number))

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
                                (filteredBalanceSheets.length !== 0)
                                    ? (null)
                                    : (
                                        <FormatNull
                                            text="Aucune ligne de bilan n'a été trouvée"
                                            className="p-2"
                                        />
                                    )
                            }
                            {filteredBalanceSheets.map((balanceSheet) => {
                                const balanceSheetChildren = getBalanceSheetChildren({
                                    balanceSheet: balanceSheet,
                                    balanceSheets: sidedBalanceSheets,
                                })

                                return (
                                    <BalanceSheetItem
                                        key={balanceSheet.id}
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                        balanceSheet={balanceSheet}
                                        balanceSheetChildren={balanceSheetChildren}
                                        level={0}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            }}
        </DataWrapper>
    )
}