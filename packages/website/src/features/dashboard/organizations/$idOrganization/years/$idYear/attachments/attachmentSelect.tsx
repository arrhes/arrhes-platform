import { readAllAttachmentsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"
import { InputCombobox } from "../../../../../../../components/inputs/inputCombobox.tsx"
import { useDataFromAPI } from "../../../../../../../utilities/useHTTPData.ts"

export function AttachmentSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const attachmentsResponse = useDataFromAPI({
        routeDefinition: readAllAttachmentsRouteDefinition,
        body: {
            idOrganization: props.idOrganization,
            idYear: props.idYear,
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
                attachmentsResponse.data === undefined
                    ? []
                    : attachmentsResponse.data.map((attachment) => ({
                          key: attachment.id,
                          label: attachment.reference,
                      }))
            }
        />
    )
}
