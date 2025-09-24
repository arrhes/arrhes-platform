import { readAllBalanceSheetsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { InputCombobox } from "components/inputs/inputCombobox"
import { useHTTPData } from "utilities/useHTTPData"
import * as v from "valibot"


export function BalanceSheetsSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
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
                    : balanceSheetsResponse.data.map((balanceSheet) => ({
                        key: balanceSheet.id,
                        label: `${balanceSheet.number} ${balanceSheet.label}`
                    }))
            }
        />
    )
}
