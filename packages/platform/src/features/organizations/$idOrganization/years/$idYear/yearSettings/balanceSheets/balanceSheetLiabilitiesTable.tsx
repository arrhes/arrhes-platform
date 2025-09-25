import { FormatNull } from "#/components/formats/formatNull.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { BalanceSheetItem } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetItem.js"
import { groupBalanceSheets } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/groupBalanceSheets.js"
import { readAllBalanceSheetsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function BalanceSheetLiabilitiesTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    return (
        <DataWrapper
            routeDefinition={readAllBalanceSheetsRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
                idYear: props.idYear
            }}
        >
            {(balanceSheets) => {
                const balanceSheetAssets = balanceSheets.filter((balanceSheet) => balanceSheet.side === "liability")
                const groupedBalanceSheets = groupBalanceSheets({
                    balanceSheets: balanceSheetAssets,
                    digits: 1
                })
                    .sort((a, b) => a.balanceSheet.number.toString().localeCompare(b.balanceSheet.number.toString()))

                if (groupedBalanceSheets.length === 0) {
                    return (
                        <FormatNull
                            text="Aucune ligne de bilan n'a été trouvée"
                            className="p-2"
                        />
                    )
                }
                return (
                    <div className="h-fit w-fit flex flex-col justify-start items-start">
                        {groupedBalanceSheets.map((groupedBalanceSheet, index) => (
                            <BalanceSheetItem
                                key={groupedBalanceSheet.balanceSheet.id}
                                idOrganization={props.idOrganization}
                                idYear={props.idYear}
                                groupedBalanceSheet={groupedBalanceSheet}
                                displayIndexes={[]}
                                currentIndex={index}
                                length={groupedBalanceSheets.length}
                                level={0}
                            />
                        ))}
                    </div>
                )
            }}
        </DataWrapper>
    )
}