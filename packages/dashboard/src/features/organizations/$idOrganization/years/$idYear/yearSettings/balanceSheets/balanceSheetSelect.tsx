import { InputCombobox } from "#/components/inputs/inputCombobox.js"
import { useHTTPData } from "#/utilities/useHTTPData.js"
import { readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import * as v from "valibot"


export function BalanceSheetsSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
    side: "asset" | "liability" | null
}) {
    const balanceSheetsResponse = useHTTPData({
        routeDefinition: readAllBalanceSheetsRouteDefinition,
        body: {
            idOrganization: props.idOrganization,
            idYear: props.idYear
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={balanceSheetsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner une ligne de bilan"
            options={
                (balanceSheetsResponse.data === undefined)
                    ? []
                    : balanceSheetsResponse.data
                        .filter((balanceSheet) => props.side === undefined || balanceSheet.side === props.side)
                        .map((balanceSheet) => ({
                            key: balanceSheet.id,
                            label: `${balanceSheet.number} ${balanceSheet.label}`
                        }))
            }
        />
    )
}
