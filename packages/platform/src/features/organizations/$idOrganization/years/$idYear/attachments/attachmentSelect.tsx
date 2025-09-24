import { readAllAttachmentsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { InputCombobox } from "components/inputs/inputCombobox"
import { useHTTPData } from "utilities/useHTTPData"
import * as v from "valibot"


export function AttachmentSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const attachmentsResponse = useHTTPData({
        routeDefinition: readAllAttachmentsRouteDefinition,
        body: {
            idOrganization: props.idOrganization,
            idYear: props.idYear
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={attachmentsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner une pièce justificative"
            options={
                (attachmentsResponse.data === undefined)
                    ? []
                    : attachmentsResponse.data.map((attachment) => ({
                        key: attachment.id,
                        label: attachment.reference
                    }))
            }
        />
    )
}
