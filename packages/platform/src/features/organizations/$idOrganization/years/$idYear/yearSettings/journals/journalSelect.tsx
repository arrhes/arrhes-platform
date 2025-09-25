import { InputCombobox } from "#/components/inputs/inputCombobox.js"
import { useHTTPData } from "#/utilities/useHTTPData.js"
import { readAllJournalsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function JournalSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const journalsResponse = useHTTPData({
        routeDefinition: readAllJournalsRouteDefinition,
        body: {
            idOrganization: props.idOrganization,
            idYear: props.idYear
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={journalsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner un journal"
            options={
                (journalsResponse.data === undefined)
                    ? []
                    : journalsResponse.data?.map((journal) => ({
                        key: journal.id,
                        label: `${journal.code} ${journal.label}`
                    }))
            }
        />
    )
}
