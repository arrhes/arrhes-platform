import { InputCombobox } from "#/components/inputs/inputCombobox.js"
import { useHTTPData } from "#/utilities/useHTTPData.js"
import { readAllRecordLabelsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function RecordLabelSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const recordLabelsResponse = useHTTPData({
        routeDefinition: readAllRecordLabelsRouteDefinition,
        body: {
            idOrganization: props.idOrganization,
            idYear: props.idYear
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={recordLabelsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner la catégorie"
            options={
                (recordLabelsResponse.data === undefined)
                    ? []
                    : recordLabelsResponse.data?.map((recordLabel) => ({
                        key: recordLabel.id,
                        label: `${recordLabel.label}`
                    }))
            }
        />
    )
}
