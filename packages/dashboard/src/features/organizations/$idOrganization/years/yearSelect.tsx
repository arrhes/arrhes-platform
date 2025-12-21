import { InputSelect } from "#/components/inputs/inputSelect.js"
import { useHTTPData } from "#/utilities/useHTTPData.js"
import { readAllYearsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
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
