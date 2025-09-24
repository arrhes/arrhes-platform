import { readAllYearsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { InputSelect } from "components/inputs/inputSelect"
import { useHTTPData } from "utilities/useHTTPData"
import * as v from "valibot"


export function YearSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const yearsResponse = useHTTPData({
        routeDefinition: readAllYearsRouteDefinition,
        body: {
            idOrganization: props.idOrganization
        },
    })

    return (
        <InputSelect
            value={props.value}
            onChange={props.onChange}
            isLoading={yearsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner un exercice"
            options={
                (yearsResponse.data === undefined)
                    ? []
                    : yearsResponse.data.map((year) => ({
                        key: year.id,
                        label: year.label
                    }))
            }
        />
    )
}
