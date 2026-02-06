import { readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useState } from "react"
import * as v from "valibot"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { InputDebounced } from "../../../../../../../../components/inputs/inputDebounced.tsx"
import { InputText } from "../../../../../../../../components/inputs/inputText.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { BalanceSheetItem } from "./balanceSheetItem.tsx"
import { getBalanceSheetChildren } from "./getBalanceSheetChildren.tsx"


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
                    <div className={css({ h: "fit-content", w: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4" })}>
                        <InputDebounced
                            value={globalFilter ?? ""}
                            onChange={(value) => setGlobalFilter(value ?? "")}
                        >
                            <InputText
                                placeholder="Recherche"
                                className={css({ maxW: "[320px]" })}
                            />
                        </InputDebounced>
                        <div className={css({ h: "fit-content", w: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                            {
                                (filteredBalanceSheets.length !== 0)
                                    ? (null)
                                    : (
                                        <FormatNull
                                            text="Aucune ligne de bilan n'a été trouvée"
                                            className={css({ p: "2" })}
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
